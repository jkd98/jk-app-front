import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createExercise, getExercises } from "../services/ExerciseAPI";

import { toast } from 'react-toastify';
import type { UseFormReset } from "react-hook-form";
import type { DraftExerciseT } from "../types";

export const useCreateExercise = (reset:UseFormReset<DraftExerciseT>) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient(); // Instanciar el cliente
    return useMutation({
        mutationFn: createExercise,
        onError: (error) => {
            console.log(error);
            notify(error.message);
        },
        onSuccess: (data) => {
            console.log(data);
            notify(data.msg);
            reset({name:''});
            // Invalidar la cache de 'exercises'
            queryClient.invalidateQueries({ queryKey: ['exercises'] });
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
