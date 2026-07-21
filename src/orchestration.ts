import type { DeepScan, FastGuess } from "./contracts.ts";

export type CapturedFrame = {
  id: string;
  phase: "whole_plant" | "problem_area" | "underside" | "environment";
  quality: number;
};

export type VisualPlan = {
  runFastGuessFor: string[];
  runDeepScan: boolean;
  deepScanFrameIds: string[];
  missingView: CapturedFrame["phase"] | null;
};

const REQUIRED_PHASES: CapturedFrame["phase"][] = [
  "whole_plant",
  "problem_area",
  "environment",
];

export function buildVisualPlan(frames: CapturedFrame[]): VisualPlan {
  const useful = frames.filter((frame) => frame.quality >= 0.6);
  const bestByPhase = new Map<CapturedFrame["phase"], CapturedFrame>();

  for (const frame of useful) {
    const current = bestByPhase.get(frame.phase);
    if (!current || frame.quality > current.quality) bestByPhase.set(frame.phase, frame);
  }

  const missingView = REQUIRED_PHASES.find((phase) => !bestByPhase.has(phase)) ?? null;
  const deepScanFrames = [...bestByPhase.values()];

  return {
    runFastGuessFor: useful.map((frame) => frame.id),
    runDeepScan: missingView === null,
    deepScanFrameIds: missingView === null
      ? deepScanFrames.map((frame) => frame.id)
      : [],
    missingView,
  };
}

export function compactRealtimeContext(
  fastGuess: FastGuess | null,
  deepScan: DeepScan | null,
): string {
  if (deepScan) {
    const identity = deepScan.identityCandidates[0]?.commonName ?? "unconfirmed plant";
    const symptom = deepScan.symptoms[0] ?? "no clear symptom";
    const action = deepScan.safeActions[0]?.action ?? "keep conditions stable";
    return `Deep visual result: ${identity}. Visible evidence: ${symptom}. Safe next action: ${action}. Preserve uncertainty.`;
  }

  if (fastGuess) {
    const identity = fastGuess.provisionalIdentity?.commonName ?? "identity not locked";
    return `Fast visual update: ${identity}. ${fastGuess.voiceSummary} Next view: ${fastGuess.nextBestView}. This is provisional.`;
  }

  return "Visual analysis is unavailable. Continue the voice session and offer a calm retry.";
}
