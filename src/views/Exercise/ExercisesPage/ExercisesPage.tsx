import { toast } from "react-toastify";
import { useGetExercises } from "../../../hooks/useExercise"
import s from './ExercisesPage.module.css';
import { Link } from "react-router-dom";
import CreateExercisePage from "../CreateExercisePage/CreateExercisePage";

export default function ExercisesPage() {
    const { data, status, error } = useGetExercises();
    if (status === 'error') {
        toast(error.message, { toastId: 'x1' })
    }
    if (data) return (
        <section className={s["section-exercises"]}>
            <h1>Ejercicios</h1>
            <div className={s["content"]}>
                <section className={s["exercises-list"]}>
                    {data.length > 0 ? (
                        data.map(d => (
                            <div className={s["exercise-detail"]}>
                                <p key={d._id} >{d.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tienes ejercicios registrados</p>
                    )}
                </section>
                <div className={s["form-create"]}>
                    <CreateExercisePage></CreateExercisePage>
                </div>
            </div>
            <Link to='/ejercicios/crear' className="btn-add" >+</Link>
        </section>
    )
}
