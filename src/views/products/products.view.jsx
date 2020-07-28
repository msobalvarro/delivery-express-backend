import React, { useReducer, useEffect } from "react"

// import constants and functions
import { reducer, http, loader, getHeaders } from "../../utils/constant.util"

// import assets and styles 
import "./products.styles.scss"

// import components
import Modal from "../../components/modal/modal.component"
import Swal from "sweetalert2"

const inialState = {
    // state for config componet
    filter: "",
    categories: [],
    showAddedProduct: false,


    // new product
    name: "",
    category: "",
    estimatedTime: "",
    note: "",
    price: "",
    stock: "",
    photo: null,
}

const ProductsView = () => {
    const [state, dispatch] = useReducer(reducer, inialState)

    /**
     * Metodo que cierra modal para agregar producto
     */
    const onCancelAdd = () => {
        dispatch({ type: "showAddedProduct", payload: false })
    }

    /**
     * Metodo que ejecuta el envio de los datos de nuevo producto
     */
    const onSubmitAdd = async () => {
        try {
            const form = new FormData()            

            // validamos en nombre del producto
            if (state.name.length === 0) {
                throw "Ingrese un nombre"
            }

            // validamos si el precio es correcto
            if (isNaN(parseFloat(state.price)) || state.price.length === 0) {
                throw "Ingresa un precio valido"
            }


            // validamos si la existencia es correcta
            if (isNaN(parseInt(state.stock)) || state.stock.length === 0) {
                throw "Ingresa una cantidad de existencia valida"
            }

            // validamos si el tiempo estimado es correcto
            if (isNaN( parseInt(state.estimatedTime)) || state.estimatedTime.length === 0) {
                throw "Ingresa un tiempo estimado valido"
            }

            // validamos si el usuario ya selecciono una foto
            if (state.photo === null) {
                throw "Eliga una foto"
            }


            // activamos el loader
            loader(true)

            // agregamos todos los datos
            form.append("photo", state.photo)
            form.append("category", state.category)
            form.append("description", state.name)
            form.append("note", state.note)
            form.append("price", parseFloat(state.price))
            form.append("stock", parseInt(state.stock))
            form.append("time", parseInt(state.estimatedTime))


            // ejecutamos la peticion
            const { data } = await http.post("/product/add", form, getHeaders())

            // verificamos si no hay errores
            if (data.error) {
                throw data.message
            }

            // verificamos si la respuesta es correcta
            if (data.response === "success") {
                // enviamos el mensaje
                Swal.fire("Delychina", "Tu producto fue procesado", "success")


                // limpiamos todos los campos
                dispatch({ type: "photo", payload: null })
                dispatch({ type: "description", payload: "" })
                dispatch({ type: "note", payload: "" })
                dispatch({ type: "price", payload: "" })
                dispatch({ type: "stock", payload: "" })
                dispatch({ type: "time", payload: "" })
            } else {
                throw "El producto no se ha podido procesar, contacte a soporte"
            }
        } catch (error) {
            Swal.fire("Ha ocurrido un error", error.toString(), "error")
        } finally {
            loader(false)
        }
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

    /**
     * Metodo que se ejecuta cuando el usuario selecciona las imagenes
     */
    const onUploadImages = async (e) => {
        try {
            const { files } = e.target

            // constante donde guardaremos la foto seleccionada
            const image = files[0]

            // validaremos el tipo de archivo `image/*`
            if (!image.type.search("image") > -1) {
                dispatch({ type: "photo", payload: image })
            } else {
                throw "Formato de imagen no soportado"
            }
        } catch (error) {
            Swal.fire("Ha ocurrido un error", error, "error")
        }

    }

    useEffect(() => {
        configurateComponent()
    }, [])

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
                <button className="button" onClick={_ => dispatch({ type: "showAddedProduct", payload: true })}>Agregar</button>
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

                        <div className="col">
                            <span className="legend">Exitencia</span>
                            <input type="number" className="text-input" placeholder="10" value={state.stock} onChange={e => dispatch({ type: "stock", payload: e.target.value })} />
                        </div>
                    </div>

                    <div className="row">
                        <span className="legend">Nota</span>
                        <input type="text" className="text-input" placeholder="" value={state.note} onChange={e => dispatch({ type: "note", payload: e.target.value })} />
                    </div>


                    <div className="row">
                        <span className="legend">Fotos</span>

                        <input type="file" className="file-input" accept="image/*" onChange={onUploadImages} />
                    </div>


                    {/* <div className="row images">
                        {
                            state.photos.map(async (item, index) => <img src={item.preview} alt="" />)
                        }
                    </div> */}

                    <div className="row columns">
                        <div className="col">
                            <button onClick={onCancelAdd} className="button">
                                Cancelar
                            </button>
                        </div>
                        <div className="col">
                            <button onClick={onSubmitAdd} className="button">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ProductsView