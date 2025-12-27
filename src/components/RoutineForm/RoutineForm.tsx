import type { FieldArrayWithId, FieldErrors, FieldPath, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import '../LoginForm/LoginForm.css';
import type { DraftRoutineT } from '../../types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './RoutineForm.css'
import { useGetExercises } from '../../hooks/useExercise';

type RoutineFormProps = {
    register: UseFormRegister<DraftRoutineT>;
    errors: FieldErrors<DraftRoutineT>;
    fields: FieldArrayWithId<DraftRoutineT, "exercises", "id">[];
    append: UseFieldArrayAppend<DraftRoutineT, "exercises">;
    remove: UseFieldArrayRemove;
}

export default function RoutineForm({ register, errors, fields, append, remove }: RoutineFormProps) {
    const { data } = useGetExercises();
    return (
        <>
            <div className="campo">
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id='name'
                    placeholder='Ej. Rutina A'
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'El nombre es obligatorio'
                        }
                    })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            <fieldset className="exercises">
                <legend>Ejercicios</legend>
                {/* 1. La lista de ejercicios (Vagones) */}
                {fields.map((field, index) => (
                    <div key={field.id} className="ejercicio-row">
                        <div className="campo">
                            <label htmlFor='exercises'>Ejercicio:</label>
                            <select id='exercises' {...register(`exercises.${index}.exerciseId` as FieldPath<DraftRoutineT>)}>
                                <option value="">-- Seleccionar --</option>
                                {data?.map(e=>(<option value={e._id}>{e.name}</option>))}
                            </select>
                        </div>

                        <div className="campo">
                            <label htmlFor="series">Series:</label>
                            <input
                                id='series'
                                type="number"
                                placeholder="Ej. 3"
                                {...register(`exercises.${index}.series` as FieldPath<DraftRoutineT>, { valueAsNumber: true })}
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="reps">Repeticiones:</label>
                            <input
                                type="number"
                                id="reps"
                                placeholder='Ej. 10'
                                {...register(`exercises.${index}.reps` as FieldPath<DraftRoutineT>, { valueAsNumber: true })}
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="weight">Peso:</label>
                            <input
                                type="number"
                                id="weight"
                                placeholder='Ej. 10'
                                {...register(`exercises.${index}.weight` as FieldPath<DraftRoutineT>, { valueAsNumber: true })}
                            />
                        </div>

                        {/* El botón de eliminar SI va dentro de la fila */}
                        <div className="cont-btn-delete">

                            <button className='btn-delete' type="button" onClick={() => remove(index)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}

                {/* 2. El botón de añadir SIEMPRE fuera del map */}
                <button
                    className='btn-agg'
                    type="button"
                    onClick={() => append({ exerciseId: '', series: 0, reps: 0, weight: 0 })}
                >
                    + Añadir otro ejercicio
                </button>
            </fieldset>
        </>
    )
}
