import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LearningTopic } from '../types'

type LearningState = {
  topics: LearningTopic[]
  activeTopicId: number | null
  setActiveTopic: (id: number) => void
  addTopic: (name: string, area: string) => void
  updateTopicProgress: (id: number, progress: number, concepts?: number) => void
}

const initialTopics: LearningTopic[] = [
  { id: 1, name: 'Understanding JavaScript', area: 'Development', progress: 42, concepts: 8, updated: 'Today', tone: 'blue' },
  { id: 2, name: 'The psychology of habits', area: 'Psychology', progress: 26, concepts: 5, updated: 'Yesterday', tone: 'coral' },
  { id: 3, name: 'Visual composition', area: 'Design', progress: 18, concepts: 3, updated: 'This week', tone: 'yellow' },
]

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      topics: initialTopics,
      activeTopicId: 1,
      setActiveTopic: (id) => set({ activeTopicId: id }),
      addTopic: (name, area) =>
        set((state) => ({
          topics: [
            ...state.topics,
            {
              id: Date.now(),
              name,
              area,
              progress: 0,
              concepts: 0,
              updated: 'Just now',
              tone: ['blue', 'coral', 'yellow', 'lilac'][state.topics.length % 4] as LearningTopic['tone'],
            },
          ],
        })),
      updateTopicProgress: (id, progress, concepts) =>
        set((state) => ({
          topics: state.topics.map((topic) =>
            topic.id === id
              ? { ...topic, progress: Math.max(0, Math.min(100, progress)), concepts: concepts ?? topic.concepts, updated: 'Today' }
              : topic,
          ),
        })),
    }),
    { name: 'morrow-learning-spaces' },
  ),
)
