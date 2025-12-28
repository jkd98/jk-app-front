import { useFieldArray, useForm } from "react-hook-form";
import RoutineForm from "../../../components/RoutineForm/RoutineForm";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import type { DraftRoutineT } from "../../../types";
import { useCreateRoutine } from "../../../hooks/useRoutine";

import s from './CreateRoutinePage.module.css'
import slp from '../../Auth/LoginPage/LoginPage.module.css';

export default function CreateRoutinePage() {

    // Para el formulario
    const initialValues: DraftRoutineT = {
        name: '',
        exercises: [{ exerciseId: '', reps: 0, series: 0, weight: 0 }]
    };
    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "exercises" // Debe coincidir con el nombre en tu Type/Interface
    });
    const { mutate } = useCreateRoutine();
    const handleForm = async (data: DraftRoutineT) => { mutate(data) };
    return (
        <section className={s["section-form"] }>
            <h1>Crear Rutina</h1>
            <form className={slp["form"]} noValidate onSubmit={handleSubmit(handleForm)}>
                <ToastContainer></ToastContainer>
                <RoutineForm
                    register={register}
                    errors={errors}
                    fields={fields}
                    append={append}
                    remove={remove}
                />
                <input type="submit" value="Crear Rutina" className="btn btn-block" />
            </form>
        </section>
    )
}
