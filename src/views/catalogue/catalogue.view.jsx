import React, { useReducer } from "react"

// import constants and functions
import { reducer } from "../../utils/constant.util"

// import assets and styles
import "./catalogue.styles.scss"

const initialState = {
    // buscador de elementos
    filter: "",
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

                <button className="button">Editar</button>
                <button className="button" onClick={_ => dispatch({ type: "showAddedProduct", payload: true })}>Agregar</button>
            </div>


            <div className="block">
                <h2>Mi Catalogo</h2>

                <div className="catalogue"></div>
            </div>          
        </div>
    )
}

export default CatalogueView