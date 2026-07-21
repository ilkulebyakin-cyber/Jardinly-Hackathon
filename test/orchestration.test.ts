import assert from "node:assert/strict";
import test from "node:test";

import { buildVisualPlan, compactRealtimeContext } from "../src/orchestration.ts";

test("waits for useful multi-view evidence before deep scan", () => {
  const incomplete = buildVisualPlan([
    { id: "whole", phase: "whole_plant", quality: 0.91 },
    { id: "leaf", phase: "problem_area", quality: 0.87 },
  ]);
  assert.equal(incomplete.runDeepScan, false);
  assert.equal(incomplete.missingView, "environment");

  const complete = buildVisualPlan([
    { id: "whole", phase: "whole_plant", quality: 0.91 },
    { id: "blurred", phase: "problem_area", quality: 0.3 },
    { id: "leaf", phase: "problem_area", quality: 0.87 },
    { id: "pot", phase: "environment", quality: 0.76 },
  ]);
  assert.equal(complete.runDeepScan, true);
  assert.deepEqual(complete.deepScanFrameIds, ["whole", "leaf", "pot"]);
});

test("returns a calm visual degradation message without ending voice", () => {
  assert.match(compactRealtimeContext(null, null), /Continue the voice session/);
});
