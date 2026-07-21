export type RealtimeSessionInput = {
  deployment: string;
  language: string;
  voice?: string;
  vadEagerness?: "low" | "medium" | "high" | "auto";
  noiseReduction?: "near_field" | "far_field";
};

export function buildRealtimeSession(input: RealtimeSessionInput) {
  const voice = input.voice ?? "marin";
  const vadEagerness = input.vadEagerness ?? "low";
  const noiseReduction = input.noiseReduction ?? "far_field";

  return {
    session: {
      type: "realtime",
      model: input.deployment,
      reasoning: { effort: "low" },
      instructions: [
        `Speak in the selected app language: ${input.language}.`,
        "Keep replies calm and short: one to three sentences.",
        "After one camera instruction, wait for the user or an app event.",
        "Do not claim that you continuously see the camera.",
        "Treat visual model updates as sampled evidence, not a live video feed.",
      ].join(" "),
      audio: {
        input: {
          noise_reduction: { type: noiseReduction },
          turn_detection: {
            type: "semantic_vad",
            eagerness: vadEagerness,
            create_response: true,
            interrupt_response: true,
          },
        },
        output: { voice },
      },
    },
  } as const;
}

