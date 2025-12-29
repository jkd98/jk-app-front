import { Navigate, Outlet } from "react-router-dom";
import './AuthLayout.css';
import { useGetUserAuth } from "../../hooks/useAuth";


export default function AuthLayout() {
  const { data, isLoading, isError } = useGetUserAuth();
  if (isLoading) {
    return (<p>Cargando...</p>)
  }

  if (isError) {
    return (
      <section className="auth-section">
        <div className="gota"></div>
        <Outlet />
      </section>
    )
  }

  if (data) {
    return (<Navigate to='/rutinas' replace ></Navigate>)
  }
}
