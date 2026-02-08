import { useFieldArray, useForm } from "react-hook-form";
import RoutineForm from "../../../components/RoutineForm/RoutineForm";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import type { DraftRoutineT } from "../../../types";
import { useCreateRoutine, useGetRoutine } from "../../../hooks/useRoutine";

import s from './CreateRoutinePage.module.css'
import slp from '../../Auth/LoginPage/LoginPage.module.css';
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function CreateRoutinePage() {
    const idRutina = useParams().id;
    let title = "Crear Rutina";

        // Para el formulario
    const initialValues: DraftRoutineT = {
        name: '',
        exercises: [{ exerciseId: '', reps: 0, series: 0, weight: 0 }]
    };
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "exercises" // Debe coincidir con el nombre en tu Type/Interface
    });

    if(idRutina){
        const { data } = useGetRoutine(idRutina);   
        useEffect(()=>{
            if(data){
                reset({
                    name: data.name,
                    exercises: data.exercises?.map(e=>({
                        exerciseId: e.exerciseId._id,
                        reps: e.reps,
                        series: e.series,
                        weight: e.weight
                    }))
                });
            }
        },[idRutina,data,reset])
    }
    
    const { mutate } = useCreateRoutine();
    const handleForm = async (data: DraftRoutineT) => { 
        if(!idRutina){
            mutate(data)
            return;
        }
        console.log("Actualizando");
    };
    return (
        <section className={s["section-form"] }>
            <h1>{title}</h1>
            <form className={slp["form"]} noValidate onSubmit={handleSubmit(handleForm)}>
                <ToastContainer></ToastContainer>
                <RoutineForm
                    register={register}
                    errors={errors}
                    fields={fields}
                    append={append}
                    remove={remove}
                />
                <input type="submit" value={idRutina ? 'Actualizar Rutina': 'Crear Rutina'} className="btn btn-block" />
            </form>
        </section>
    )
}
