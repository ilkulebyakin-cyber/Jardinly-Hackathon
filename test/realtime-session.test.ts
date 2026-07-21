import assert from "node:assert/strict";
import test from "node:test";

import { buildRealtimeSession } from "../src/realtime-session.ts";

test("uses the Build Week calm companion profile", () => {
  const request = buildRealtimeSession({
    deployment: "gpt-realtime-2.1",
    language: "en",
  });

  assert.equal(request.session.audio.output.voice, "marin");
  assert.equal(request.session.audio.input.turn_detection.type, "semantic_vad");
  assert.equal(request.session.audio.input.turn_detection.eagerness, "low");
  assert.equal(request.session.audio.input.noise_reduction.type, "far_field");
  assert.match(request.session.instructions, /Do not claim that you continuously see/);
  assert.equal("temperature" in request.session, false);
});
