# Morrow

Morrow is a learning companion for people learning anything. Start with a question or a topic, learn through conversation, practise what you understand, and return to a session with context.

## Product experience
- Public homepage explaining the product, learning loop, and different ways to work through a subject.
- Workspace overview with persistent learning spaces.
- Study room with Explain, Practice, Quiz, Review, and Explore modes.
- Materials shelf, learning progress, and a flexible weekly plan.
- Local persistence for learning spaces and progress.

## Stack
React, TypeScript, Vite, Tailwind CSS v4, Zustand, Lucide icons, and self-hosted Bricolage Grotesque and DM Sans fonts.

## Run locally
```bash
npm install
npm run dev
```

Production build: `npm run build` then `npm run preview`.

## Current implementation boundaries
Study companion responses are simulated. Material cards are sample content; file upload, document extraction, AI retrieval, authentication, and server-side learner memory are not connected. Learning spaces persist in browser storage through Zustand persist.

## Design direction
Cobalt blue, ink, coral, yellow, lilac and green on a paper background. Bricolage Grotesque for headings and DM Sans for reading, both self-hosted. Tokens and the verified contrast table are in `docs/design-system.md`.
