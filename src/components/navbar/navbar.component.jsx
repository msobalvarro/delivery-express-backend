import React, { useState, useEffect } from "react"

// import constants and functions
import moment from "moment"
import { LogOut } from "../../utils/constant.util"

// import assets and styles
import "./navbar.styles.scss"


const Navbar = () => {
    const [time, setTime] = useState(new Date())

    /**
     * Metodo que se ejecuta cuando el usuario cierra sesion
     */
    const killSession = () => LogOut()

    useEffect(() => {
        // Actualizamos la hora cada segundo
        const intervalTime = setInterval(() => setTime(new Date()), 1000)

        return () => clearInterval(intervalTime)
    }, [])

    return (
        <nav className="navigation-bar">
            <h2 className="data-name-app">
                Dely China (ADMIN)
            </h2>

            <span className="date-now">
                {moment(time).format("HH:mm | DD/MM/YY")}
            </span>
            
            <span onClick={killSession} className="data-user">
                <span>Cerrar sesion</span>
            </span>
        </nav>
    )
}

export default Navbar