import { clamp, fovealResponse, projectFacet, springStep } from "./math.js";
import { staggeredColour, transitionDuration } from "./palette.js";
import { loadSvgFacets } from "./svg-facets.js";

/**
 * Background SVG field for the landing hero.
 * setCameraPaused(true) suspends pointer/scroll targets only — elapsed time,
 * gravitational drift (phase float), and palette continue.
 */
export async function mountHeroField(canvas, source, options = {}) {
  if (!canvas || !source) return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
  if (!context) return null;

  let facets;
  let viewBox;
  let palette;
  try {
    ({ facets, viewBox, palette } = await loadSvgFacets(source));
  } catch (error) {
    console.warn("[mark-canvas] Hero field SVG failed; CSS twin retained.", error);
    return null;
  }
  if (!facets.length) return null;

  let width = 1;
  let height = 1;
  let dpr = 1;
  let frame = 0;
  let destroyed = false;
  let visible = true;
  let cameraPaused = false;
  let previous = performance.now();
  let elapsed = 0;
  const target = { yaw: 0, pitch: 0, depth: 0.12, planeX: 0, planeY: 0 };
  const restDepth = options.restDepth ?? 0.12;
  target.depth = restDepth;
  const camera = {
    yaw: { value: 0, velocity: 0 },
    pitch: { value: 0, velocity: 0 },
    depth: { value: restDepth, velocity: 0 },
    planeX: { value: 0, velocity: 0 },
    planeY: { value: 0, velocity: 0 },
  };
  const paletteTransition = { from: 0, to: 0, elapsed: 2 };
  const paletteDelay = options.paletteDelay ?? 0.06;
  const paletteDuration = options.paletteDuration ?? 0.5;
  const paletteTotal = transitionDuration(facets.length, paletteDelay, paletteDuration);
  let paletteChanging = false;
  const pointerRoot = options.pointerRoot || canvas.parentElement;

  function draw() {
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const fit =
      Math.min(width / viewBox.width, height / viewBox.height) * (options.fitScale ?? 1.02);
    const items = facets.map((facet) => ({
      facet,
      projected: projectFacet(facet, viewBox, camera, elapsed, {
        ...options,
        floatDepth: options.floatDepth ?? 4,
        extrusionStrength: options.extrusionStrength ?? 1.2,
      }),
    }));
    items.sort((a, b) => b.projected.z - a.projected.z || a.facet.index - b.facet.index);

    for (const { facet, projected } of items) {
      const matrix = new DOMMatrix()
        .translate(
          width / 2 + camera.planeX.value + projected.x * fit,
          height / 2 + camera.planeY.value + projected.y * fit,
        )
        .scale(fit * projected.perspective * facet.scaleX, fit * projected.perspective * facet.scaleY)
        .translate(-facet.rawX, -facet.rawY);
      context.save();
      context.transform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
      context.fillStyle = staggeredColour(
        facet,
        palette,
        paletteTransition,
        paletteDelay,
        paletteDuration,
      );
      context.fill(facet.path);
      context.restore();
    }
  }

  function schedule() {
    if (!destroyed && visible && !frame) frame = requestAnimationFrame(tick);
  }

  function tick(now) {
    frame = 0;
    const delta = Math.min(0.032, Math.max(0.001, (now - previous) / 1000));
    previous = now;
    elapsed += delta;
    springStep(camera.yaw, target.yaw, delta, 5.5);
    springStep(camera.pitch, target.pitch, delta, 5.5);
    springStep(camera.depth, target.depth, delta, 4.8);
    springStep(camera.planeX, target.planeX, delta, 4.2, 0.95);
    springStep(camera.planeY, target.planeY, delta, 4.2, 0.95);
    if (paletteChanging) {
      paletteTransition.elapsed += delta;
      if (paletteTransition.elapsed >= paletteTotal) {
        paletteTransition.elapsed = paletteTotal;
        paletteTransition.from = paletteTransition.to;
        paletteChanging = false;
      }
    }
    draw();
    schedule();
  }

  function resize() {
    const host = canvas.parentElement || canvas;
    const bounds = host.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    dpr = Math.min(window.devicePixelRatio || 1, options.dprCap || 1.15);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    draw();
  }

  function onPointer(event) {
    if (cameraPaused || event.isPrimary === false) return;
    const bounds = (pointerRoot || canvas).getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const x = clamp((event.clientX - centerX) / Math.max(1, bounds.width * 0.5), -1, 1);
    const y = clamp((event.clientY - centerY) / Math.max(1, bounds.height * 0.5), -1, 1);
    const response = fovealResponse(x, y, options.fovealDeadZone ?? 0.12);
    target.yaw = x * response.gain * (options.yawAmplitude ?? 0.045);
    target.pitch = -y * response.gain * (options.pitchAmplitude ?? 0.034);
    target.depth = restDepth + response.gain * 0.35;
    target.planeX = x * response.gain * width * (options.planeTravelX ?? 0.018);
    target.planeY = y * response.gain * height * (options.planeTravelY ?? 0.014);
  }

  function onLeave() {
    if (cameraPaused) return;
    target.yaw = 0;
    target.pitch = 0;
    target.depth = restDepth;
    target.planeX = 0;
    target.planeY = 0;
  }

  function rotatePalette() {
    if (palette.length < 2) return;
    paletteTransition.from = paletteTransition.to;
    paletteTransition.to = (paletteTransition.to + 1) % palette.length;
    paletteTransition.elapsed = 0;
    paletteChanging = true;
  }

  const paletteTimer =
    options.autoPalette === false || palette.length < 2
      ? 0
      : window.setInterval(rotatePalette, options.paletteInterval ?? 7800);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.parentElement || canvas);
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { threshold: 0.02 },
  );
  visibilityObserver.observe(canvas.parentElement || canvas);

  pointerRoot?.addEventListener("pointermove", onPointer, { passive: true });
  pointerRoot?.addEventListener("pointerleave", onLeave, { passive: true });

  resize();
  schedule();

  return {
    setCameraPaused(active) {
      cameraPaused = active === true;
      if (cameraPaused) {
        target.yaw = 0;
        target.pitch = 0;
        target.depth = restDepth;
        target.planeX = 0;
        target.planeY = 0;
      }
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      if (paletteTimer) window.clearInterval(paletteTimer);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      pointerRoot?.removeEventListener("pointermove", onPointer);
      pointerRoot?.removeEventListener("pointerleave", onLeave);
    },
  };
}
