import { useForm } from 'react-hook-form';
import LoginForm from '../../../components/LoginForm/LoginForm';
import '../LoginPage/LoginPage.css';
import type { LoginT } from '../../../types';
import { useLogin } from '../../../hooks/useAuth';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {

    const initialValues: LoginT = {
        email: '',
        pass: ''
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const { mutate } = useLogin();
    const handleLogin = async (data: LoginT) => mutate(data);
    return (
        <section className='section-form'>
            <h1>iniciar sesión</h1>
            <form className="form" onSubmit={handleSubmit(handleLogin)} noValidate>
                <ToastContainer></ToastContainer>

                <LoginForm
                    errors={errors}
                    register={register}
                />
                <input type="submit" value="Iniciar Sesión" className='btn btn-block' />
            </form>
        </section>
    )
}
