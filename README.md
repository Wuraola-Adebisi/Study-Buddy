# Morrow

Morrow is a learning companion for people learning anything. Start with a question or a topic, learn through conversation, practise what you understand, and return to a session with context.

## Product experience
- Public homepage explaining the product, learning loop, and different ways to work through a subject.
- Workspace overview with persistent learning spaces.
- Study room with Explain, Practice, Quiz, Review, and Explore modes.
- Materials shelf, learning progress, and a flexible weekly plan.
- Local persistence for learning spaces and progress.

## Stack
React, TypeScript, Vite, Tailwind CSS v4, Zustand, and Lucide icons.

## Run locally
```bash
npm install
npm run dev
```

Production build: `npm run build` then `npm run preview`.

## Current implementation boundaries
Study companion responses are simulated. Material cards are sample content; file upload, document extraction, AI retrieval, authentication, and server-side learner memory are not connected. Learning spaces persist in browser storage through Zustand persist.

## Design direction
An expressive, high-contrast learning identity: cobalt blue, ink, coral, yellow, and lilac; Space Grotesk for display and DM Sans for reading. The public site is a full product introduction, while the workspace uses separate task-oriented navigation and layout.