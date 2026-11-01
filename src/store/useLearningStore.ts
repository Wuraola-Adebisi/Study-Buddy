import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage, LearningTopic, LearningMode } from '../types'

type StudySession = { messages: ChatMessage[]; mode: LearningMode; activityCount: number }
type LearningState = {
  topics: LearningTopic[]
  activeTopicId: number | null
  sessions: Record<number, StudySession>
  setActiveTopic: (id: number) => void
  addTopic: (name: string, area: string) => void
  updateTopicProgress: (id: number, progress: number, concepts?: number) => void
  saveSession: (id: number, session: StudySession) => void
  recordActivity: (id: number, concepts?: number) => void
}

const initialTopics: LearningTopic[] = [
  { id: 1, name: 'Understanding JavaScript', area: 'Development', progress: 42, concepts: 8, updated: 'Today', tone: 'blue' },
  { id: 2, name: 'The psychology of habits', area: 'Psychology', progress: 26, concepts: 5, updated: 'Yesterday', tone: 'coral' },
  { id: 3, name: 'Visual composition', area: 'Design', progress: 18, concepts: 3, updated: 'This week', tone: 'yellow' },
  { id: 4, name: 'Personal finance foundations', area: 'Finance', progress: 12, concepts: 2, updated: 'This week', tone: 'lilac' },
  { id: 5, name: 'Climate and ecosystems', area: 'Science', progress: 0, concepts: 0, updated: 'Not started', tone: 'green' },
]

const starterMessage = (name: string): ChatMessage => ({
  id: 1,
  role: 'assistant',
  content: `Welcome back to **${name}**. Choose a mode above, or tell me what you are trying to understand. We can work through an idea, practise it, or check what you remember.`,
})

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      topics: initialTopics,
      activeTopicId: 1,
      sessions: {},
      setActiveTopic: (id) => set({ activeTopicId: id }),
      addTopic: (name, area) =>
        set((state) => {
          const id = Date.now()
          return {
            topics: [...state.topics, {
              id, name, area, progress: 0, concepts: 0, updated: 'Just now',
              tone: ['blue', 'coral', 'yellow', 'lilac'][state.topics.length % 4] as LearningTopic['tone'],
            }],
            activeTopicId: id,
            sessions: { ...state.sessions, [id]: { messages: [starterMessage(name)], mode: 'Explain', activityCount: 0 } },
          }
        }),
      updateTopicProgress: (id, progress, concepts) =>
        set((state) => ({
          topics: state.topics.map((topic) => topic.id === id
            ? { ...topic, progress: Math.max(0, Math.min(100, progress)), concepts: concepts ?? topic.concepts, updated: 'Today' }
            : topic),
        })),
      saveSession: (id, session) => set((state) => ({ sessions: { ...state.sessions, [id]: session } })),
      recordActivity: (id, concepts = 0) => {
        const topic = get().topics.find((item) => item.id === id)
        if (!topic) return
        set((state) => ({
          topics: state.topics.map((item) => item.id === id ? {
            ...item,
            progress: Math.min(100, item.progress + 3),
            concepts: item.concepts + concepts,
            updated: 'Today',
          } : item),
        }))
      },
    }),
    { name: 'morrow-learning-spaces', version: 2, migrate: (persisted: unknown) => persisted as LearningState },
  ),
)
