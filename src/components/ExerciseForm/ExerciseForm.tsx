import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { DraftExerciseT } from "../../types";

import s from '../LoginForm/LoginForm.module.css';

type ExerciseFormProps = {
    register: UseFormRegister<DraftExerciseT>;
    errors: FieldErrors<DraftExerciseT>;
}

export default function ExerciseForm({ register, errors }: ExerciseFormProps) {
    return (
        <>
            <div className={s["campo"]}>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Ej. Push Ups"
                    // toma una copia de la funcion para este input
                    {...register("name", {
                        //Aqui van las validaciones
                        required: "El nombre del ejercicio es obligatorio",
                        pattern: {
                            value: /^[a-z]+[\s*[A-Z]*]*$/i,
                            message: "El nombre solo admite letras"
                        }
                    })}
                />
                {/* Si hay errores y el componente existe, muestra el error */}
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
