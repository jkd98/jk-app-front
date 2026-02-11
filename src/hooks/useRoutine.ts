import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRoutine, getAllRoutines, getRoutineById, updateRoutine } from "../services/RoutineAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { DraftRoutineT } from "../types";

export const useCreateRoutine = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: createRoutine,
        onError: (error) => {
            console.log(error)
            toast(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
            toast(data.msg);
            navigate('/rutinas')
        }
    })
}

export const useGetRoutines = () => {
    return useQuery({
        queryKey: ['routines'],
        queryFn: getAllRoutines,
        retry: false
    });
}

export const useGetRoutine = (id:string) => {
    return useQuery({
        queryKey:['one-routine',id],
        queryFn: ()=>getRoutineById(id),
        retry:false
    })
}


// Definimos un tipo para lo que la mutación necesita recibir
type UpdateRoutineArgs = {
    id: string;
    data: DraftRoutineT;
};

export const useUpdateRoutine = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient(); // Para invalidar el caché
    return useMutation({
        // 1. mutationFn recibe los argumentos aquí
        mutationFn: ({ id, data }: UpdateRoutineArgs) => updateRoutine(id, data),
        
        onError: (error) => {
            toast.error(error.message);
        },
        
        onSuccess: (data) => {
            // 2. IMPORTANTE: Invalidar la caché para que la UI se actualice
            queryClient.invalidateQueries({ queryKey: ['routines'] });
            toast.success(data.msg || "Rutina actualizada correctamente");
            navigate('/rutinas')
        }
    });
}