import { exercisesSchema, type DraftExerciseT } from "../types";
import axios from "../lib/axios";
import { isAxiosError } from "axios";


export async function createExercise(formData: DraftExerciseT) {
    try {
        const { data } = await axios.post('/exercise/', formData);
        return data;
    } catch (error) {
        //console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}

export async function getExercises() {
    try {
        const { data } = await axios.get('/exercise/')
        const response = exercisesSchema.safeParse(data.data);
        console.log(response);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        //console.log(error);
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}


