import axios from "axios"
import jwt from "jwt-simple"

// Store and action from redux
import store from "../store/index"

import { SETLOADER } from "../store/actionsTypes"

/**Direeccion de servidor backemd */
// const SERVER_ADDRESS = "http://localhost:8000"
const SERVER_ADDRESS = "http://restauranteanonuevochino.com"

/**keystore para guardar los datos en localstore */
const keyStorage = "@storage"

/**Constante que almacena el keysecret par encriptar */
const keySecret = "muSuperrAmazingKEYSTORE"

export const http = axios.create({
    baseURL: SERVER_ADDRESS,
    validateStatus: (status) => {
        if (status === 401) {
            // LogOut()
        }

        return status >= 200 && status < 300;
    }
})

/**Funcion que ejecuta cierre de sesion */
export const LogOut = async (location = "/") => {
    await globalStore.delete()

    window.location.hash = location

    window.location.reload()
}

export const globalStore = {
    /** Elimina el api storage de localstorage */
    delete: () => localStorage.removeItem(keyStorage),

    /**Setea los datos de api storage modo encriptado */
    set: (json = {}) => {
        const data = jwt.encode(json, keySecret)

        localStorage.setItem(keyStorage, data)
    },

    /**Desencripta el api storage del dashboard y lo retorna */
    get: () => {
        const storage = localStorage.getItem(keyStorage)

        if (storage) {
            return jwt.decode(storage, keySecret)
        } else {
            return {}
        }
    }
}

/**
 * Reducer para estados de react `(useReducer)`
 * 
 * @param {*} state 
 * @param {*} action 
 */
export const reducer = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload
    }
}

/**
 *  Funcion que activa/desactiva precarga general de la aplicacion
 */
export const loader = (payload = false) => store.dispatch({ type: SETLOADER, payload })

/**
 * Funcion que retorna las cabeceras de la peticions
 */
export const getHeaders = () => {
    const { token } = store.getState().global


    return {
        headers: {
            "x-auth-token": token,
            "Accept": 'application/json',
            "Content-Type": 'multipart/form-data',
        }
    }
}