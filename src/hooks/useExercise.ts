import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createExercise, getExercises } from "../services/ExerciseAPI";

import { toast } from 'react-toastify';

export const useCreateExercise = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: createExercise,
        onError: (error) => {
            console.log(error);
            notify(error.message);
        },
        onSuccess: (data) => {
            console.log(data);
            notify(data.msg);
            navigate('/ejercicios');
        }
    })
}

export const useGetExercises = () => {
    return useQuery({
        queryKey:['exercises'], // esto debe ser unico pues cachea la informacion 
        queryFn:getExercises,
        retry:false,
    })
}

const notify = (msg:string) => toast(msg);
