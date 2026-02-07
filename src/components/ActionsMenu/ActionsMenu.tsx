import s from './ActionsMenu.module.css'
import type { RoutineT } from "../../types";


type Props = {
    routine: RoutineT['_id'];
    routines: RoutineT[];
    setRoutines: React.Dispatch<React.SetStateAction<RoutineT[]>>;
    actions: { actionName: string, icon?: string, action:CallableFunction }[];
}

export default function ActionsMenu({ routine, routines, setRoutines, actions }: Props) {
    const handleActions = () => {
        const updatedRoutines = routines.map(r => r._id === routine ? { ...r, actionsMenu: !r.actionsMenu } : { ...r, actionsMenu: false });
        setRoutines(updatedRoutines);
    }
    return (
        <div className={[s['actions__container']].join(' ')}>
            <button className={[s["btn-actions"]].join(' ')} onClick={() => handleActions()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </button>
            {routines.find(r => r._id === routine)?.actionsMenu && <div className={[s['actions__menu']].join(' ')}>
                {actions && actions.map(a => <button key={a.actionName} type="button" className={[s['actions__menu--action']].join(' ')} onClick={() => a.action()} >{a.actionName}</button>)}
            </div>}

        </div>
    )
}
