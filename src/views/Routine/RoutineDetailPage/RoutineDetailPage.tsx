import { useParams } from "react-router-dom";
import { useGetRoutine } from "../../../hooks/useRoutine";
import Cronometro from "../../../components/Cronometro/Cronometro";
import s from './RoutineDetailPage.module.css'

export default function RoutineDetailPage() {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const { data } = useGetRoutine(id!);
    if (data) {
        return (
            <section className={s["routine"]}>
                <h1 className={s["routine__name"]}>{data.name}</h1>
                <div className={s["routine-detail"]} key={data._id} >
                    <div className={s["routine-exercises-cont"]}>
                        {data.exercises && data.exercises.length > 0 ?
                            (data.exercises.map(e => (
                                <div className={s["routine-exercises"]} key={e.exerciseId._id}>
                                    <div className={s["exercise-detail"]}>
                                        <p className={s["e-name"]}><span>{e.exerciseId.name}</span></p>
                                        <p>Repeticiones: <span>{e.reps}</span></p>
                                        <p>Series: <span>{e.series}</span></p>
                                        <p>Peso: <span>{e.weight}</span> kg</p>
                                    </div>
                                    <div className={s["exercise-controls"]}>
                                        {[...Array(e.series)].map((_,i)=>(<label key={i} htmlFor={`${e.exerciseId._id}+${i}`}><input  id={`${e.exerciseId._id}+${i}`} type="checkbox" />{++i}</label>))}
                                    </div>
                                </div>))
                            ) :
                            (<p>Sin ejercicios</p>)
                        }
                    </div>
                    <div className={s["routine-cron"]}>
                        <Cronometro></Cronometro>
                    </div>
                </div>
            </section>

        )
    }
}
