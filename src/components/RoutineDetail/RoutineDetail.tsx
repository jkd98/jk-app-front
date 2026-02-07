import { useState } from "react";
import type { RoutineT } from "../../types";
import s from './RoutineDetail.module.css'

type RoutineDetailProps = {
    routine: RoutineT;
}

export default function RoutineDetail({ routine }: RoutineDetailProps) {
    const [excercises, setExercises] = useState(routine.exercises?.map(e=>({...e,activeMenu:false})));
    const handleAddMoreReps = (id: string) => {
        console.log('add more reps');
        let exerciseId = id;
        const excercisesUpdated = excercises?.map(e => (e.exerciseId._id === exerciseId) ? { ...e, series: e.reps = e.series + 1 } : { ...e });
        setExercises(excercisesUpdated);
    }
    return (
        <>
            <div className={s["routine-exercises-cont"]}>
                {excercises && excercises.length > 0 ?
                    (excercises.map(e => (
                        <div className={[s["routine-exercises"], 'bg-cards'].join(' ')} key={e.exerciseId._id}>
                            <p className={s["e-name"]}><span>{e.exerciseId.name}</span></p>
                            <div className={s["exercise-detail"]}>
                                <p>Repeticiones: <span>{e.reps}</span></p>
                                <p>Series: <span>{e.series}</span></p>
                                <p>Peso: <span>{e.weight}</span> kg</p>
                            </div>
                            <div className={s["exercise-controls"]}>
                                {[...Array(e.series)].map((_, i) => (<label key={i} htmlFor={`${e.exerciseId._id}+${i}`}><input id={`${e.exerciseId._id}+${i}`} type="checkbox" />{++i}</label>))}
                            </div>
                            <button className={[s["btn-more-reps"]].join(' ')} onClick={() => handleAddMoreReps(e.exerciseId._id)}>+</button>
                        </div>))
                    ) :
                    (<p>Sin ejercicios</p>)
                }
            </div>

        </>
    )
}
