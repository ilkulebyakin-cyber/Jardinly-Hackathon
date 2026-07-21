export type BuildWeekModelRouting = {
  realtimeVoice: string;
  fastVisual: string;
  deepVisual: string;
  realtimeRollback?: string;
};

export const DEFAULT_BUILD_WEEK_MODELS: BuildWeekModelRouting = {
  realtimeVoice: "gpt-realtime-2.1",
  fastVisual: "gpt-5.6-luna",
  deepVisual: "gpt-5.6-terra",
};

export function resolveBuildWeekModelRouting(
  env: NodeJS.ProcessEnv,
): BuildWeekModelRouting {
  return {
    realtimeVoice: env.AZURE_OPENAI_REALTIME_DEPLOYMENT
      ?? DEFAULT_BUILD_WEEK_MODELS.realtimeVoice,
    fastVisual: env.AZURE_OPENAI_REALTIME_CONTEXT_DEPLOYMENT
      ?? DEFAULT_BUILD_WEEK_MODELS.fastVisual,
    deepVisual: env.AZURE_OPENAI_AERM_DEEP_DEPLOYMENT
      ?? DEFAULT_BUILD_WEEK_MODELS.deepVisual,
    realtimeRollback: env.AZURE_OPENAI_REALTIME_15_DEPLOYMENT || undefined,
  };
}

export function routeVisualTask(
  task: "frame_quality" | "fast_guess" | "deep_scan" | "final_verification",
  routing: BuildWeekModelRouting = DEFAULT_BUILD_WEEK_MODELS,
): string {
  return task === "deep_scan" || task === "final_verification"
    ? routing.deepVisual
    : routing.fastVisual;
}

