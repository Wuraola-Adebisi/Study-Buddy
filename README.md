# Morrow

A thoughtful AI learning companion. Learn from your own materials or explore a topic, with a conversation that remembers where you left off.

## Current build
This repository currently contains a frontend-first MVP with a mocked learning companion and local demo state. No external AI provider or backend is connected yet.

## Run locally
```bash
npm install
npm run dev
```

## Product areas
- Home: continue learning, learning spaces, gentle daily prompts
- Study room: conversational Explain, Practice, Quiz, Review, Explore modes
- Materials: resource library and upload affordances
- Progress: concept and learning-space progress
- Study plan: weekly learning rhythm
- Settings: profile and learning preferences

## Next implementation passes
1. Replace mock chat with a provider-agnostic streaming API adapter.
2. Add auth and durable user data.
3. Implement file upload, extraction, chunking, retrieval and source citations.
4. Persist learner profile, session summaries and concept-level learning memory.
5. Add accessibility, tests, telemetry and production deployment configuration.

The name **Morrow** is a working brand and can be changed independently of the app structure.
