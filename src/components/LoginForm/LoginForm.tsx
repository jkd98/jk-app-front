import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import './LoginForm.css';
import type { LoginT } from '../../types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

type LoginFormProps = {
    register: UseFormRegister<LoginT>;
    errors: FieldErrors<LoginT>;
}

export default function LoginForm({ register, errors }: LoginFormProps) {
    return (
        <>
            <div className="campo">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id='email'
                    placeholder='example@email.com'
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'El email es obligatorio'
                        }
                    })}
                />
                {errors.email && (<ErrorMessage>{errors.email.message}</ErrorMessage>)}
            </div>
            <div className="campo">
                <label htmlFor="pass">Contraseña:</label>
                <input
                    type="password"
                    id='pass'
                    placeholder='********'
                    {...register('pass', {
                        required: {
                            value: true,
                            message: 'La contraseña es obligatoria'
                        }
                    })}
                />
                {errors.pass && (<ErrorMessage>{errors.pass.message}</ErrorMessage>)}
            </div>
        </>
    )
}
