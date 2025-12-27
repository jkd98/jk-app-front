import { useMutation, useQuery } from "@tanstack/react-query";
import { createRoutine, getAllRoutines, getRoutineById } from "../services/RoutineAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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