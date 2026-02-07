import { Link, useNavigate } from "react-router-dom";

import styles from './RoutinePage.module.css';

import { useGetRoutines } from "../../../hooks/useRoutine";
import { toast } from "react-toastify";
import ActionsMenu from "../../../components/ActionsMenu/ActionsMenu";
import { useMemo, useState } from "react";
import type { RoutineT } from "../../../types";

export default function RoutinePage() {

  const { data, error } = useGetRoutines();

  const [routines, setRoutines] = useState<RoutineT[]>([]);

  useMemo(() => {
    if (data) {
      setRoutines(data);
    }
  }, [data]);

  const navigate = useNavigate()

  if (error) {
    return toast(error.message)
  }

  if (data) {
    return (
      <section className={styles["routines"]}>
        <h1>Mis Rutinas</h1>
        <aside className={styles["routines-list"]}>
          {routines.length > 0 ? (
            routines.map((r) => (
              <div className={[styles["routine-detail"], 'bg-cards'].join(' ')} key={r._id} >
                <h3 className={styles["routine__name"]} onClick={() => navigate(`/rutina/${r._id}`)}>{r.name}</h3>
                <div className={styles["routine-exercises-cont"]} onClick={() => navigate(`/rutina/${r._id}`)}>
                  {r.exercises && r.exercises.length > 0 ?
                    (r.exercises.map(e => (<div className={styles["routine-exercises"]} key={e.exerciseId._id}>
                      <p className={styles["e-name"]}><span>{e.exerciseId.name}</span></p>
                      <p>Repeticiones: <span>{e.reps}</span></p>
                      <p>Series: <span>{e.series}</span></p>
                      <p>Peso: <span>{e.weight}</span></p>
                    </div>))) :
                    (<p>Sin ejercicios</p>)
                  }
                </div>
                <div className={[styles['btn-actions__container']].join(' ')} >
                  <ActionsMenu
                    routine={r._id}
                    routines={routines}
                    setRoutines={setRoutines}
                    actions={[
                      { actionName: 'Editar', action: () => navigate(`/rutinas/editar/${r._id}`) },
                      { actionName: 'Eliminar', action: () => console.log('eliminar rutina') }
                    ]}
                  />

                </div>
              </div>
            ))
          ) : (<p>No tienes rutinas aún</p>)
          }
        </aside>
        <Link to="/rutinas/crear" className="btn-add" >+</Link>
      </section>
    )
  }
}
