import React from "react"

// import styles and assets
import "./login.styles.scss"

const LoginView = () => {
    return (
        <div className="login-container">
            <form className="form-control">
                <div className="header">
                    Sistema de control DelyChina
                </div>

                <div className="row">
                    <input type="text" required placeholder="Nombre de usuario" className="text-input"/>
                </div>

                <div className="row">
                    <input type="password" required placeholder="Contraseña" className="text-input"/>
                </div>

                <div className="row buttons">
                    <button className="button" type="submit">
                        Entrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginView