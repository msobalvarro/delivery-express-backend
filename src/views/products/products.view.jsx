import React, { useReducer } from "react"

// import assets and styles 
import "./products.styles.scss"
import { reducer, loader } from "../../utils/constant.util"

const inialState = {
    filter: ""
}

const ProductsView = () => {
    const [state, dispatch] = useReducer(reducer, inialState)

    return (
        <div className="products-view view">
            <div className="header">
                <input
                    className="search-engine"
                    placeholder="Buscar | Filtrar"
                    type="search"
                    value={state.filter}
                    onChange={e => dispatch({ type: "filter", payload: e.target.value })} />

                <button className="button">Editar</button>
                <button className="button">Agregar</button>
            </div>
        </div>
    )
}

export default ProductsView