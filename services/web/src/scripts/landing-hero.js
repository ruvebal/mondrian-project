import {
  bindFaviconBackgroundMotion,
  mountFaviconCanvas,
  mountHeroField,
} from "@mondrian/mark-canvas";

/**
 * Mount decorative Canvas twins for the landing hero.
 * Reduced-motion / failure leaves static SVG (CSS bg + mark img) in place.
 */
export async function mountLandingHero(root = document) {
  const hero = root.querySelector("[data-landing-hero]");
  if (!hero) return () => {};

  const fieldCanvas = hero.querySelector("[data-landing-field]");
  const fieldSrc = hero.dataset.heroSrc;
  const markHost = hero.querySelector("[data-favicon-src]");

  let field = null;
  let mark = null;
  let unbind = () => {};

  if (fieldCanvas && fieldSrc) {
    field = await mountHeroField(fieldCanvas, fieldSrc, {
      pointerRoot: hero,
      restDepth: 0.1,
      floatDepth: 3.5,
      yawAmplitude: 0.04,
      pitchAmplitude: 0.03,
      dprCap: 1.15,
      autoPalette: true,
      paletteInterval: 8200,
    });
    if (field) hero.classList.add("is-field-ready");
  }

  if (markHost) {
    mark = await mountFaviconCanvas(markHost, {
      fovealDeadZone: 0.08,
      yawAmplitude: 0.07,
      pitchAmplitude: 0.052,
      planeTravelX: 0.042,
      planeTravelY: 0.032,
      minPerspective: 0.94,
      maxPerspective: 1.06,
      dprCap: 1.25,
      autoPalette: true,
      paletteInterval: 5200,
    });
  }

  if (field && markHost) {
    unbind = bindFaviconBackgroundMotion(hero, field, {
      selector: "[data-favicon-src]",
    });
  }

  return () => {
    unbind();
    mark?.destroy?.();
    field?.destroy?.();
    hero.classList.remove("is-field-ready");
  };
}

mountLandingHero().then((destroy) => {
  window.addEventListener("astro:before-swap", () => destroy?.(), { once: true });
});
