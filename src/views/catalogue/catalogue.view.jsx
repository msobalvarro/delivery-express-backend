import React, { useReducer } from "react"

// import constants and functions
import { reducer } from "../../utils/constant.util"

// import assets and styles
import "./catalogue.styles.scss"
import Modal from "../../components/modal/modal.component"

const initialState = {
    // buscador de elementos
    filter: "",

    showAddedProduct: false,

    // new product
    name: "",
    category: 0,
    estimatedTime: "",
    price: "",
}

const CatalogueView = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const onCancelAdd = () => {
        dispatch({ type: "showAddedProduct", payload: false })
    }

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

            <div className="block">
                <h2>Mi Catalogo</h2>

                <div className="catalogue"></div>
            </div>

            <Modal isVisible={state.showAddedProduct}>
                <div className="window">
                    <h2>Datos de nuevo producto</h2>

                    <div className="row">
                        <span className="legend">Nombre</span>
                        <input type="text" className="text-input" value={state.name} onChange={e => dispatch({ type: "name", payload: e.target.value })} />
                    </div>

                    <div className="row">
                        <span className="legend">Categoria</span>
                        <select value={state.category} onChange={e => dispatch({ type: "category", payload: e.target.value })} className="text-input">
                            <option value={0}>Nueva categoria</option>
                        </select>
                    </div>

                    <div className="row columns">
                        <div className="col">
                            <span className="legend">Tiempo estimado</span>
                            <input type="text" className="text-input" placeholder="30 min" value={state.estimatedTime} onChange={e => dispatch({ type: "estimatedTime", payload: e.target.value })} />
                        </div>
                        <div className="col">
                            <span className="legend">Precio</span>
                            <input type="text" className="text-input" placeholder="C$ 100" value={state.price} onChange={e => dispatch({ type: "price", payload: e.target.value })} />
                        </div>
                    </div>

                    <div className="row columns">
                        <div className="col">
                            <button onClick={onCancelAdd} className="button">
                                Cancelar
                            </button>
                        </div>
                        <div className="col">
                            <button onClick={onCancelAdd} className="button">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CatalogueView