import { rectToPathData, sourceLayerDepth, svgScale, svgViewBox } from "./math.js";
import { buildPalette } from "./palette.js";

const SVG_NS = "http://www.w3.org/2000/svg";

function shapeElements(svg) {
  return [...svg.querySelectorAll("path, rect")].filter(
    (el) => el.tagName.toLowerCase() === "path" || el.tagName.toLowerCase() === "rect",
  );
}

function pathDataFor(el) {
  if (el.tagName.toLowerCase() === "path") return el.getAttribute("d") || "";
  return rectToPathData(el);
}

/**
 * Parse path/rect geometry from an SVG URL. Geometry stays source-order;
 * Z is source-order + bounded irregularity.
 */
export async function loadSvgFacets(source) {
  const response = await fetch(source);
  if (!response.ok) throw new Error(`SVG request failed (${response.status})`);
  const svg = new DOMParser()
    .parseFromString(await response.text(), "image/svg+xml")
    .documentElement;
  const viewBox = svgViewBox(svg);
  const measure = document.createElementNS(SVG_NS, "svg");
  measure.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
  Object.assign(measure.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${viewBox.width}px`,
    height: `${viewBox.height}px`,
    visibility: "hidden",
    pointerEvents: "none",
  });
  document.body.append(measure);

  const sourceShapes = shapeElements(svg);
  const facets = sourceShapes.map((sourceEl, index) => {
    const scale = svgScale(sourceEl.getAttribute("transform"));
    const d = pathDataFor(sourceEl);
    const probe = document.createElementNS(SVG_NS, "path");
    probe.setAttribute("d", d);
    measure.append(probe);
    const bounds = probe.getBBox();
    const rawX = bounds.x + bounds.width / 2;
    const rawY = bounds.y + bounds.height / 2;
    return {
      index,
      path: new Path2D(d),
      fill: sourceEl.getAttribute("fill") || "#ffffff",
      scaleX: scale.x,
      scaleY: scale.y,
      rawX,
      rawY,
      x: rawX * scale.x,
      y: rawY * scale.y,
      z: sourceLayerDepth(index, sourceShapes.length),
      phase: index * 0.73,
      inverted: false,
      inverseTransform: null,
    };
  });
  measure.remove();
  return { facets, viewBox, palette: buildPalette(facets) };
}
