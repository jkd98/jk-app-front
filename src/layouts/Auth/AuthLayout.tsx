import { Outlet } from "react-router-dom";
import './AuthLayout.css';



export default function AuthLayout() {
  return (
    <section className="auth-section">
      <div className="gota"></div>
      <Outlet />
    </section>
  )
}
