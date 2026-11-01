export type LearningMode = 'Explain' | 'Practice' | 'Quiz' | 'Review' | 'Explore'

export type LearningTopic = {
  id: number
  name: string
  area: string
  progress: number
  concepts: number
  updated: string
  tone: 'blue' | 'coral' | 'yellow' | 'lilac'
}

export type ChatMessage = { id: number; role: 'assistant' | 'user'; content: string }
