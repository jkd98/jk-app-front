import { Link } from 'react-router-dom'
import s from './Navbar.module.css'
import { useGetUserAuth, logout } from '../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

export default function Navbar() {
    const { data } = useGetUserAuth();
    const queryClient = useQueryClient();
    const handleLogOut = () => {
        logout()
        queryClient.invalidateQueries({ queryKey: ['userAuth'] })
    }

    return (
        <nav className={s['nav']}>
            <Link to='/' className={[s['nav__link'], s['nav__logo']].join(' ')} >JK<span className={s['span']}>App</span></Link>
            <div className={s['nav__links']}>
                <Link to='/rutinas' className={[s['nav__link'], s['nav__item']].join(' ')} >Rutinas</Link>
                <Link to='/ejercicios' className={[s['nav__link'], s['nav__item']].join(' ')} >Ejercicios</Link>
            </div>
            <div className={s['nav__session']}>
                {
                    data ?
                        (<button className={s['session__logout']} onClick={() => handleLogOut()}>Cerrar Session</button>) :
                        (<Link to='/auth' className={[s['nav__link'], s['session__logout']].join(' ')}>Iniciar Session</Link>)
                }
            </div>
        </nav>
    )
}
