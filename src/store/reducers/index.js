import { combineReducers } from "redux"

// imports reducers
import { global } from "./global"
import { loader } from "./loader"

const reducers = combineReducers({
    global,
    loader,
})

export default reducers