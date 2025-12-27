import { isAxiosError } from "axios";
import axios from "../lib/axios";
import { routineSchema, routinesSchema, type DraftRoutineT } from "../types";


export const createRoutine = async (formData: DraftRoutineT) => {
    try {
        const { data } = await axios.post('routine/', formData);
        return data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}

export const getAllRoutines = async () => {
    try {
        const { data } = await axios.get('routine/');
        const result = routinesSchema.safeParse(data.data);
        console.log(result)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}

export const getRoutineById = async (id:string) => {
    try {
        const { data } = await axios.get(`routine/${id}`);
        console.log(data)
        const result = routineSchema.safeParse(data.data);
        console.log(result)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}