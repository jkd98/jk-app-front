import { Link, useNavigate } from "react-router-dom";

import './RoutinePage.css';
import { useGetRoutines } from "../../../hooks/useRoutine";
import { toast } from "react-toastify";

export default function RoutinePage() {
  const { data, error } = useGetRoutines();
  const navigate = useNavigate()
  if (error) {
    return toast(error.message)
  }

  if (data) {
    return (
      <section className="routines">
        <h1>Mis Rutinas</h1>
        <section className="routines-list">
          {data.length > 0 ? (
            data.map((r) => (
              <div className="routine-detail" key={r._id} onClick={()=>navigate(`/rutina/${r._id}`)} >
                <h3 className="routine__name">{r.name}</h3>
                <div className="routine-exercises-cont">
                  {r.exercises && r.exercises.length > 0 ?
                    (r.exercises.map(e => (<div className="routine-exercises" key={e.exerciseId._id}>
                      <p className="e-name"><span>{e.exerciseId.name}</span></p>
                      <p>Repeticiones: <span>{e.reps}</span></p>
                      <p>Series: <span>{e.series}</span></p>
                      <p>Peso: <span>{e.weight}</span></p>
                    </div>))) :
                    (<p>Sin ejercicios</p>)
                  }
                </div>
              </div>
            ))
          ) : (<p>No tienes rutinas aún</p>)
          }
        </section>
        <Link to="/rutinas/crear" className="btn-add" >+</Link>
      </section>
    )
  }
}
