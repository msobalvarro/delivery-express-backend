import React, { useReducer } from "react"

// import constants and functions
import { reducer } from "../../utils/constant.util"

// import assets and styles
import "./catalogue.styles.scss"

const initialState = {
    // buscador de elementos
    filter: ""
}

const CatalogueView = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className="catalogue-view view">
            <div className="header">
                <input
                    className="search-engine" 
                    placeholder="Buscar | Filtrar"
                    type="search" 
                    value={state.filter} 
                    onChange={e => dispatch({ type: "filter", payload: e.target.value })} />

                <button className="button">Editar productos</button>
                <button className="button">Agregar nuevo</button>
            </div>


            <div className="block">
                <h2>Mi Catalogo</h2>

                <div className="catalogue"></div>
            </div>

            <div className="block">
                <h2>Mi Catalogo</h2>

                <div className="catalogue"></div>
            </div>
        </div>
    )
}

export default CatalogueView