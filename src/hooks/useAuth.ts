import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getUser, login } from "../services/AuthAPI";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: login,
        onError: (error) => {
            notify(error.message);
        },
        onSuccess: (data) => {
            console.log(data)
            notify(data.msg);
            setJWTLocalstorage(data.data);
            navigate('/rutinas');
        }
    })
}

export const useGetUserAuth = () => {
    return useQuery({
        queryKey: ['userAuth'],
        queryFn: getUser,
        retry: false
    })
}


const notify = (msg: string) => toast(msg);

const _keyJWT = '_jwtjk';
export const setJWTLocalstorage = (data: string): void => {
    window.localStorage.setItem(_keyJWT, data);
}

export const getJWTLocalStorage = (): string | null => {
    return window.localStorage.getItem(_keyJWT)
}

export const deleteJWTLocalStorage = (): void => {
    window.localStorage.removeItem(_keyJWT);
}
