# How Codex and GPT-5.6 were used

## GPT-5.6 in the product

- **GPT-5.6 Luna** is the fast visual observer. It checks sampled frames, makes a
  clearly provisional plant guess, describes a visible concern, and chooses the
  next useful camera angle.
- **GPT-5.6 Terra** is the evidence synthesizer. It receives several selected
  frames and returns structured identity candidates, symptoms, differential
  causes, confidence, evidence, uncertainty, and safe actions.
- Visual results are reduced to compact context before they enter the Realtime
  conversation. This prevents the voice model from claiming continuous vision.

## Codex in the engineering workflow

Codex with GPT-5.6 was used as an engineering collaborator across the Build Week
branch. Its attributable work included:

1. Inspecting the existing architecture and preserving a dated baseline tag.
2. Designing the Realtime/Luna/Terra responsibility split.
3. Implementing Azure session configuration, GPT-5.6 image adapters, structured
   output contracts, routing, graceful degradation, and telemetry.
4. Diagnosing production sessions from Cloud Run logs and correcting provider,
   conversation-state, GPS, localization, and plant-card UX issues.
5. Running UX and accessibility reviews, implementing an isolated Build Week
   experience shell, and adding regression coverage.
6. Running tests, typechecks, production builds, Git commits, GCP Cloud Build,
   Cloud Run deployment, traffic verification, and smoke tests.

The private production branch records this work with `Assisted-by:
GPT-5.6/Codex` commit trailers. This public extraction uses the same attribution.

## Human decisions retained

The team selected the product goal, approved the model split, supplied real
plants and production sessions, evaluated voice quality, chose deployment
resources, and made the final release decisions. Codex performed implementation,
verification, diagnosis, documentation, and deployment work under those constraints.

