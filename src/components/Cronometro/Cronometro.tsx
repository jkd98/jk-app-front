import { useEffect, useRef, useState } from "react"

import './cronometro.css';

export default function Cronometro() {
    const [time, setTime] = useState({
        seconds: 0,
        minutes: 0
    });
    let intervalId = useRef<number>(0); // para guardar el estado en valores mutables
    const [flag,setFlag] = useState(false);
    
    useEffect(() => clearInterval(intervalId.current), []) // se ejcuta al crear o eliminar el componente

    const initCron = (flag: boolean) => {
        setFlag(flag);
        if (flag) {
            // si es verdadero, inicializo el contador
            clearInterval(intervalId.current); // para evitar que se generen muchos intervals
            //actualiza el state cada 1000 ms
            intervalId.current = (setInterval(() => {
                // actualizar el state
                setTime((prev) => {
                    if (prev.seconds < 59) {
                        return {
                            ...prev,
                            seconds: prev.seconds + 1
                        }
                    } else {
                        return {
                            seconds: 0,
                            minutes: prev.minutes + 1
                        }
                    }
                })
            }, 1000)) as unknown as number; // A veces TypeScript requiere este casteo para setInterval en navegadores
        } else {
            //si el flag es falso, significa que presiono el boton de reiniciar
            clearInterval(intervalId.current);
            setTime({
                seconds: 0,
                minutes: 0
            })
        }
    }

    const formatTime = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`
    }

    return (
        <div className={`cron ${flag&&'animation-circle'}`}>
            <div className="cron__time-box">
                <p className="cron__time">{formatTime(time.minutes)}:{formatTime(time.seconds)}</p>
            </div>
            <div className="cron__btns">
                {flag===false ? (
                    <button className="cron__btn--start" onClick={() => initCron(true)}>Inicio</button>
                ):(
                    <button className="cron__btn--stop" onClick={() => initCron(false)}>Reiniciar</button>
                )}
            </div>
        </div>
    )
}
