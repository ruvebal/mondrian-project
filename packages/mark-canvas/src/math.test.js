import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  clamp,
  fovealResponse,
  projectFacet,
  rectToPathData,
  sourceLayerDepth,
} from "./math.js";

describe("fovealResponse", () => {
  it("is exactly zero at the centre", () => {
    const { gain, radius } = fovealResponse(0, 0, 0.08);
    assert.equal(radius, 0);
    assert.equal(gain, 0);
  });

  it("stays zero inside the dead zone", () => {
    assert.equal(fovealResponse(0.05, 0, 0.08).gain, 0);
  });

  it("rises monotonically toward the perimeter", () => {
    const a = fovealResponse(0.2, 0, 0.08).gain;
    const b = fovealResponse(0.5, 0, 0.08).gain;
    const c = fovealResponse(1, 0, 0.08).gain;
    assert.ok(a < b && b < c);
    assert.ok(c <= 1);
  });
});

describe("projectFacet perspective clamp", () => {
  it("never escapes 0.94–1.06 defaults", () => {
    const facet = { x: 0, y: 0, z: 400, phase: 0 };
    const viewBox = { x: 0, y: 0, width: 64, height: 64 };
    const camera = {
      yaw: { value: 0.2 },
      pitch: { value: -0.15 },
      depth: { value: 1 },
    };
    const projected = projectFacet(facet, viewBox, camera, 0, {
      minPerspective: 0.94,
      maxPerspective: 1.06,
      extrusionStrength: 2.5,
    });
    assert.ok(projected.perspective >= 0.94);
    assert.ok(projected.perspective <= 1.06);
  });
});

describe("sourceLayerDepth", () => {
  it("is deterministic", () => {
    assert.equal(sourceLayerDepth(2, 7), sourceLayerDepth(2, 7));
  });
});

describe("rectToPathData", () => {
  it("builds a closed rect path", () => {
    const el = { getAttribute: (name) => ({ x: "4", y: "8", width: "10", height: "12" })[name] };
    assert.equal(rectToPathData(el), "M4 8h10v12h-10Z");
  });
});

describe("clamp", () => {
  it("bounds values", () => {
    assert.equal(clamp(-1), 0);
    assert.equal(clamp(2), 1);
    assert.equal(clamp(0.5), 0.5);
  });
});
