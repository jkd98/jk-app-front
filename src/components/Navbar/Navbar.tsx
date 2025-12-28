import { Link } from 'react-router-dom'
import s from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={s['nav']}>
            <Link to='/' className={[s['nav__link'], s['nav__logo']].join(' ')} >JK<span className={s['span']}>App</span></Link>
            <div className={s['nav__links']}>
                <Link to='/rutinas' className={[s['nav__link'], s['nav__item']].join(' ')} >Rutinas</Link>
                <Link to='/ejercicios' className={[s['nav__link'], s['nav__item']].join(' ')} >Ejercicios</Link>
            </div>
            <div className={s['nav__session']}>
                <button className={s['session__logout']}>Cerrar Session</button>
            </div>
        </nav>
    )
}
