import { Navigate, Outlet } from "react-router-dom";
import './Layout.css'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useGetUserAuth } from "../hooks/useAuth";


export default function Layout() {
  const { data, isLoading, isError } = useGetUserAuth()
  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (!data && isError) {
    return <Navigate to="/auth" replace ></Navigate>
  }

  if (data) {
    return (
      <div className="page">
        <header className="nav">Header</header>
        <main className="main">
          <ToastContainer></ToastContainer>

          <Outlet />

        </main>
        <footer className="footer">Footer</footer>
      </div>
    )
  }
}
