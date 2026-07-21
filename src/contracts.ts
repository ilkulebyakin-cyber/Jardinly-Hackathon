export type IdentityCandidate = {
  commonName: string;
  scientificName: string | null;
  confidence: number;
  evidence: string[];
};

export type FastGuess = {
  plantVisible: boolean;
  frameUseful: boolean;
  provisionalIdentity: IdentityCandidate | null;
  visibleIssue: string | null;
  nextBestView: string;
  voiceSummary: string;
};

export type EvidenceItem = {
  frameId: string;
  observation: string;
  supports: string[];
  weakens: string[];
};

export type SafeAction = {
  action: string;
  rationale: string;
  urgency: "low" | "medium" | "high" | "critical";
};

export type DeepScan = {
  identityCandidates: IdentityCandidate[];
  symptoms: string[];
  differentialCauses: Array<{
    cause: string;
    confidence: number;
    evidence: string[];
  }>;
  evidence: EvidenceItem[];
  confidence: number;
  uncertainty: string[];
  safeActions: SafeAction[];
};

export function clampConfidence(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function isDeepScan(value: unknown): value is DeepScan {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<DeepScan>;
  return Array.isArray(candidate.identityCandidates)
    && Array.isArray(candidate.symptoms)
    && Array.isArray(candidate.differentialCauses)
    && Array.isArray(candidate.evidence)
    && typeof candidate.confidence === "number"
    && Array.isArray(candidate.uncertainty)
    && Array.isArray(candidate.safeActions);
}

