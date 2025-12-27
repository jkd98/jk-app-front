import type { StateCreator } from "zustand"

export type TTrainingSlice = {
    hola:string;
}

export const createTrainingSlice:StateCreator<TTrainingSlice> = (set) =>({
    hola:''
}) 