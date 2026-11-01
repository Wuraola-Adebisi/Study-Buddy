import type { LearningMode } from '../types'

export const modeDescriptions: Record<LearningMode, string> = {
  Explain: 'Build a clear mental model',
  Practice: 'Work through an example',
  Quiz: 'Check what you remember',
  Review: 'Revisit key ideas',
  Explore: 'Follow a related question',
}

export const sampleMaterials = [
  { name: 'JavaScript fundamentals', kind: 'Notes', detail: '8 pages · annotated examples', topic: 'Understanding JavaScript', tone: 'blue' },
  { name: 'The habit loop', kind: 'PDF', detail: '12 pages · reading notes', topic: 'The psychology of habits', tone: 'yellow' },
  { name: 'Principles of composition', kind: 'Guide', detail: '6 pages · reference guide', topic: 'Visual composition', tone: 'yellow' },
  { name: 'Cash-flow planning basics', kind: 'Worksheet', detail: '4 pages · worked examples', topic: 'Personal finance foundations', tone: 'lilac' },
  { name: 'Ecosystems and energy flow', kind: 'Study notes', detail: '9 pages · diagrams and terms', topic: 'Climate and ecosystems', tone: 'green' },
  { name: 'Functions and scope', kind: 'Cheat sheet', detail: '3 pages · quick reference', topic: 'Understanding JavaScript', tone: 'blue' },
  { name: 'Designing with contrast', kind: 'Article', detail: '5 pages · visual examples', topic: 'Visual composition', tone: 'coral' },
  { name: 'Behaviour change field notes', kind: 'Notes', detail: '7 pages · observations', topic: 'The psychology of habits', tone: 'coral' },
]
