import { useForm } from "react-hook-form";

import ExerciseForm from "../../../components/ExerciseForm/ExerciseForm";
import type { DraftExerciseT } from "../../../types";
import { useCreateExercise } from "../../../hooks/useExercise"

import slp from '../../Auth/LoginPage/LoginPage.module.css'

export default function CreateExercisePage() {
  const initialValues: DraftExerciseT = {
    name: ""
  }
  const {
    register, // Permite registrar input o select y aplicar reglas de validación de la libreria o crearlos
    handleSubmit, // Procesa el formulario
    formState: { errors }, // ver el estado del formulario, se destructura para extraer lo deseado,
    reset
  } = useForm({ defaultValues: initialValues });
  const { mutate } = useCreateExercise(reset);


  const handleForm = async (data: DraftExerciseT) => mutate(data);

  return (
    <section className={slp["section-form"]}>
      <h1>Crear Ejercicio</h1>
      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className={slp["form"]}
      >
        <ExerciseForm
          register={register}
          errors={errors}
        />

        <input type="submit" value="Registrar Ejercicio" className="btn btn-block"  />
      </form>
    </section>
  )
}
