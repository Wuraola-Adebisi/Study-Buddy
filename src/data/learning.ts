import type { LearningMode } from '../types'

export const modeDescriptions: Record<LearningMode, string> = {
  Explain: 'Build a clear mental model',
  Practice: 'Work through an example',
  Quiz: 'Check what you remember',
  Review: 'Revisit key ideas',
  Explore: 'Follow a related question',
}

export const sampleMaterials = [
  { name: 'JavaScript fundamentals', kind: 'Notes', detail: '8 pages, added recently', topic: 'Understanding JavaScript', tone: 'blue' },
  { name: 'The habit loop', kind: 'PDF', detail: '12 pages, reading notes', topic: 'The psychology of habits', tone: 'yellow' },
  { name: 'Principles of composition', kind: 'Guide', detail: '6 pages, reference guide', topic: 'Visual composition', tone: 'yellow' },
]
