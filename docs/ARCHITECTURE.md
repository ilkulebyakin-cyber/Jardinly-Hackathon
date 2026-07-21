# Build Week architecture

## Responsibility split

| Layer | Model | Responsibility |
|---|---|---|
| Conversation | Azure OpenAI `gpt-realtime-2.1` | Low-latency speech-to-speech, semantic VAD, barge-in, short companion responses |
| Fast vision | Azure OpenAI `gpt-5.6-luna` | Frame usefulness, provisional identity, visible issue, next best camera view |
| Deep vision | Azure OpenAI `gpt-5.6-terra` | Multi-frame identity verification, symptom synthesis, differential causes, evidence, uncertainty, safe actions |

Realtime receives audio and compact text context. The browser does **not** send a
continuous video stream to Realtime. Sampled frames are deliberately routed to
the visual models, and their outputs are summarized back into the conversation.

## Why two GPT-5.6 visual profiles

Luna is used in the latency-sensitive loop where the user is physically moving
the phone. Terra is invoked only when enough useful views exist and the product
needs a more careful, structured conclusion. This keeps the companion responsive
without turning a provisional observation into a diagnosis.

## Failure isolation

- Voice remains available when Luna or Terra fails.
- A malformed visual response is rejected at the contract boundary.
- Missing evidence requests another view instead of inventing certainty.
- Credentials remain server-side; clients receive only short-lived Realtime credentials.
- Authentication, quotas, session ownership, persistence, and secrets remain in the proprietary core.

## Extraction boundary

This public repository is the hackathon extension seam. The production Jardinly
repository remains private and contains its pre-existing product code. The
extension integrates through narrow contracts for model routing, session setup,
visual evidence, and compact Realtime context.

