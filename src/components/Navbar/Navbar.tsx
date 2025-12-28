import { Link, useNavigate } from 'react-router-dom'
import s from './Navbar.module.css'
import { logOut } from '../../services/AuthAPI'

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut();
        navigate('/auth');
    }

    return (
        <nav className={s['nav']}>
            <Link to='/' className={[s['nav__link'], s['nav__logo']].join(' ')} >JK<span className={s['span']}>App</span></Link>
            <div className={s['nav__links']}>
                <Link to='/rutinas' className={[s['nav__link'], s['nav__item']].join(' ')} >Rutinas</Link>
                <Link to='/ejercicios' className={[s['nav__link'], s['nav__item']].join(' ')} >Ejercicios</Link>
            </div>
            <div className={s['nav__session']}>
                <Link to='/auth' className={[ s['nav__link'], s['session__logout']].join(' ')}>Iniciar Session</Link>
                <button className={s['session__logout']} onClick={()=>handleLogOut()}>Cerrar Session</button>
            </div>
        </nav>
    )
}
