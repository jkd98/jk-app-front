import { create } from 'zustand'
import { createTrainingSlice, type TTrainingSlice } from './trainingSlice'
import { devtools } from 'zustand/middleware'

export const useAppStore = create<TTrainingSlice>()(devtools((...a)=>({
    ...createTrainingSlice(...a)
})))