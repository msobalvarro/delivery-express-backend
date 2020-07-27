import React, { useReducer, useEffect } from "react"

// import constants and functions
import { reducer, http, loader } from "../../utils/constant.util"

// import assets and styles
import "./catalogue.styles.scss"
import Modal from "../../components/modal/modal.component"

const initialState = {
    // buscador de elementos
    filter: "",

    showAddedProduct: false,

    // new product
    name: "",
    category: "",
    estimatedTime: "",
    price: "",

    // data config component
    categories: []
}

const CatalogueView = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    /**
     * Metodo que cierra modal para agregar producto
     */
    const onCancelAdd = () => {
        dispatch({ type: "showAddedProduct", payload: false })
    }

    /**
     * Metodo que configura el component
     */
    const configurateComponent = async () => {
        try {
            // loader mode on
            loader(true)

            const { data } = await http.get("/category")

            if (data.error) {
                throw data.message
            }

            // Guardamos las categorias
            dispatch({ type: "categories", payload: data.categories })
        } catch (error) {
            // messag
        } finally {
            // loader off mode
            loader(false)
        }
    }


    useEffect(() => {
        configurateComponent()
    }, [])

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
                            <option value="">Sin categoria</option>
                            {
                                state.categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                            }
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