import React, { useReducer } from "react"

// import constants and functions
import { http, reducer, loader, globalStore } from "../../utils/constant.util"
import validator from "validator"

// import styles and assets
import "./login.styles.scss"
import Swal from "sweetalert2"

const initialState = {
    email: "",
    password: ""
}

const LoginView = () => {
    // state for component
    const [state, dispatch] = useReducer(reducer, initialState)

    /**
     * Funcion que se ejecuta cuando el usuario inicia sesion
     */
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const { email, password } = state

            // validamos el correo electronico si es correcto
            if (!validator.isEmail(email)) {
                throw "El correo electronico no es correcto"
            }

            loader(true)

            const dataSend = {
                email,
                password
            }

            const { data } = await http.post("/admin/login", dataSend)

            if (data.error) {
                throw data.message
            }

            // guardamos la sesion
            await globalStore.set(data)

            // recargamos la ventana
            window.location.reload()
        } catch (error) {
            Swal.fire("Ha ocurrido un error", error.toString(), "error")
        } finally {
            loader(false)
        }
    }

    return (
        <div className="login-container">
            <form className="form-control" onSubmit={onSubmit}>
                <div className="header">
                    Sistema de control DelyChina
                </div>

                <div className="row">
                    <input
                        value={state.email}
                        onChange={e => dispatch({ type: "email", payload: e.target.value })}
                        type="email"
                        required
                        placeholder="Correo electronico"
                        className="text-input" />
                </div>

                <div className="row">
                    <input
                        value={state.password}
                        onChange={e => dispatch({ type: "password", payload: e.target.value })}
                        type="password"
                        required
                        placeholder="Contraseña"
                        className="text-input" />
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