import { useParams } from "react-router-dom";
import { useGetRoutine } from "../../../hooks/useRoutine";
import Cronometro from "../../../components/Cronometro/Cronometro";
import './RoutineDetailPage.css'

export default function RoutineDetailPage() {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const { data } = useGetRoutine(id!);
    if (data) {
        return (
            <section className="routine">
                <h1 className="routine__name">{data.name}</h1>
                <div className="routine-detail" key={data._id} >
                    <div className="routine-exercises-cont">
                        {data.exercises && data.exercises.length > 0 ?
                            (data.exercises.map(e => (
                                <div className="routine-exercises" key={e.exerciseId._id}>
                                    <div className="exercise-detail">
                                        <p className="e-name"><span>{e.exerciseId.name}</span></p>
                                        <p>Repeticiones: <span>{e.reps}</span></p>
                                        <p>Series: <span>{e.series}</span></p>
                                        <p>Peso: <span>{e.weight}</span> kg</p>
                                    </div>
                                    <div className="exercise-controls">
                                        {[...Array(e.series)].map((_,i)=>(<label key={i} htmlFor={`${e.exerciseId._id}+${i}`}><input  id={`${e.exerciseId._id}+${i}`} type="checkbox" />{++i}</label>))}
                                    </div>
                                </div>))
                            ) :
                            (<p>Sin ejercicios</p>)
                        }
                    </div>
                    <div className="routine-cron">
                        <Cronometro></Cronometro>
                    </div>
                </div>
            </section>

        )
    }
}
