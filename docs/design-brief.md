# Morrow design brief

## Status
- **Mode:** Restyle and improve an existing build.
- **Style identity:** Proposed, not yet approved by the owner.
- **Product name:** Morrow remains a working brand in this repository.

## Product and audience
Morrow is a learning companion for self-directed learners. People can start with a subject, a question, or a learning goal, then use different study approaches to build understanding over time. The interface must communicate that learning is iterative and personal without looking like a course catalogue, school LMS, or generic AI chat product.

## Style identity: Curious cartography
A lively, contemporary learning environment that treats ideas as things to explore, connect, and revisit.

**Keywords:** curious, direct, optimistic, tactile, clear.

**Signature moves:** cobalt as the primary action color; ink-colored typographic statements; warm yellow and coral as secondary accents; layered study-note compositions; diagrams and small conceptual markers that explain the learning process.

**One memorable thing:** a layered, tilted study-note illustration in the hero that shows a question, a practice prompt, and a learning record as parts of one learning journey.

**Anti-patterns:** generic AI sparkle marks; purple gradients; stock-photo student montages; identical metric-card grids; permanent sidebar-first layouts; tiny metadata; fake product screenshots; ornamental icons that do not communicate a function.

## Reference analysis
The reference set was used for principles, not copied layouts:
- LearningFirst: structured learning journeys, progression beyond isolated Q&A, and the relationship between an AI tutor and a learner's wider path.
- Baymard online-learning benchmark: course and learning flows need clear decision support, useful page hierarchy, and robust interaction states.
- UI Discovery edtech collection: product sites need to explain the product, communicate its features, and answer objections rather than stop at a hero.
- OpenDesign editorial product study: typography and paced narrative can make a product introduction feel authored. Its warm-paper/serif treatment was not adopted because the Playbook explicitly flags that combination as an overused default.

## Tokens
- Ink: #171B2A
- Paper: #F4F5F0
- Cobalt: #3456D1
- Deep cobalt: #263FA7
- Coral: #F07861
- Yellow: #F5CF58
- Lilac: #DCD7F7
- Soft green: #DCE9C9
- Display: Space Grotesk
- Body: DM Sans

Semantic tokens are mapped through Tailwind CSS v4's theme layer. Components should use token-backed utilities rather than raw hex values.

## Page architecture
- Public homepage: proposition, product illustration, capabilities, learning loop, study modes, product fit, FAQ, CTA, footer.
- Workspace: overview, study room, materials, progress, study plan, settings.
- Marketing navigation and workspace navigation are separate components because they serve different tasks.

## Copy principles
Plain, concrete language. Avoid unsupported claims about adaptive AI, session memory, file processing, or connected accounts until those capabilities exist. Buttons name the action. FAQs distinguish planned functionality from what the current build does.

## Interaction and responsive floor
- Semantic links and buttons, visible focus, labeled fields.
- Native details/summary for the FAQ.
- Responsive layouts should be checked at 360, 768, 1280, and 1920 px.
- Respect reduced motion. Use one ambient animation in the hero, not motion on every component.

## Implementation boundaries
The current build uses simulated study responses and sample material records. Learning spaces and topic progress persist in browser storage. Authentication, file upload, document extraction, grounded retrieval, conversation history, and server-side learner memory are not implemented.

## Open decisions
- Owner approval of the Curious cartography visual identity.
- Final public brand name and domain.
- Whether authentication and onboarding should be introduced before backend integration.
