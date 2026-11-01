import type { LearningMode } from '../types'

export const modeDescriptions: Record<LearningMode, string> = {
  Explain: 'Build a clear mental model',
  Practice: 'Work through an example',
  Quiz: 'Check what you remember',
  Review: 'Revisit key ideas',
  Explore: 'Follow a related question',
}

export const sampleMaterials = [
  { name: 'JavaScript fundamentals', kind: 'NOTES', detail: '8 pages · Added recently', topic: 'Understanding JavaScript', tone: 'blue' },
  { name: 'The habit loop', kind: 'PDF', detail: '12 pages · Reading notes', topic: 'The psychology of habits', tone: 'coral' },
  { name: 'Principles of composition', kind: 'GUIDE', detail: '6 pages · Reference guide', topic: 'Visual composition', tone: 'yellow' },
]
