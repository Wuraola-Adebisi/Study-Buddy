import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {starterTopics} from '../data/learning'
import type {LearningTopic} from '../types'
type Store={topics:LearningTopic[];activeTopicId:number;addTopic:(name:string,area:string)=>void;setActiveTopic:(id:number)=>void;updateTopicProgress:(id:number,progress:number)=>void}
export const useLearningStore=create<Store>()(persist(set=>({topics:starterTopics,activeTopicId:1,addTopic:(name,area)=>set(s=>({topics:[...s.topics,{id:Date.now(),name,area,progress:0,concepts:0,updated:'Just added',tone:(['blue','coral','yellow','lilac'] as const)[s.topics.length%4]}]})),setActiveTopic:activeTopicId=>set({activeTopicId}),updateTopicProgress:(id,progress)=>set(s=>({topics:s.topics.map(t=>t.id===id?{...t,progress}:t)}))}),{name:'morrow-learning-state'}))