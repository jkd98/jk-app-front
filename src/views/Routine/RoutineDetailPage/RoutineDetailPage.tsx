import { useParams } from "react-router-dom";
import { useGetRoutine } from "../../../hooks/useRoutine";
import Cronometro from "../../../components/Cronometro/Cronometro";
import s from './RoutineDetailPage.module.css'
import RoutineDetail from "../../../components/RoutineDetail/RoutineDetail";

export default function RoutineDetailPage() {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const { data } = useGetRoutine(id!);
    if (data) {
        return (
            <section className={s["routine"]}>
                <h1 className={s["routine__name"]}>{data.name}</h1>
                <div className={s["routine-detail"]} key={data._id} >
                    <RoutineDetail
                        routine={data}
                    />
                    <div className={s["routine-cron"]}>
                        <Cronometro></Cronometro>
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <>Sin Rutinas</>
        )
    }
}
