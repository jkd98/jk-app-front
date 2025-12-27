import { isAxiosError } from "axios";
import axios from "../lib/axios"
import { userSchema, type LoginT } from "../types"

export const login = async (formData: LoginT) => {
    try {
        const { data } = await axios.post('/user/login', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}

export const getUser = async () => {
    try {
        const { data } = await axios.get('/user/');
        //console.log(data)
        const response = userSchema.safeParse(data.data);
        //console.log(response)
        if(response.success){
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.msg);
        }
    }
}