import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_BUILD_WEEK_MODELS,
  resolveBuildWeekModelRouting,
  routeVisualTask,
} from "../src/model-routing.ts";

test("routes fast frame work to Luna and evidence synthesis to Terra", () => {
  assert.equal(routeVisualTask("fast_guess"), "gpt-5.6-luna");
  assert.equal(routeVisualTask("frame_quality"), "gpt-5.6-luna");
  assert.equal(routeVisualTask("deep_scan"), "gpt-5.6-terra");
  assert.equal(routeVisualTask("final_verification"), "gpt-5.6-terra");
});

test("keeps deployment names configurable without changing role separation", () => {
  const routing = resolveBuildWeekModelRouting({
    AZURE_OPENAI_REALTIME_DEPLOYMENT: "voice-deployment",
    AZURE_OPENAI_REALTIME_CONTEXT_DEPLOYMENT: "fast-deployment",
    AZURE_OPENAI_AERM_DEEP_DEPLOYMENT: "deep-deployment",
  });

  assert.deepEqual(routing, {
    realtimeVoice: "voice-deployment",
    fastVisual: "fast-deployment",
    deepVisual: "deep-deployment",
    realtimeRollback: undefined,
  });
  assert.equal(DEFAULT_BUILD_WEEK_MODELS.realtimeVoice, "gpt-realtime-2.1");
});
