import axios from "axios"
import jwt from "jwt-simple"

/**Direeccion de servidor backemd */
const SERVER_ADDRESS = "http://localhost:8080"

/**keystore para guardar los datos en localstore */
const keyStorage = "@storage"

/**Constante que almacena el keysecret par encriptar */
const keySecret = "muSuperrAmazingKEYSTORE"

export const http = axios.create({
    baseURL: SERVER_ADDRESS,
    validateStatus: (status) => {
        if (status === 401) {
            LogOut()
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