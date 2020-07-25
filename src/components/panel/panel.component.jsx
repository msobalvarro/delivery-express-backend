import React from "react"

// import components
import { Link } from "react-router-dom"

// import constant and functions
import routes from "../../utils/routes.config"

// import assets and styles
import "./panel.styles.scss"

const Panel = () => {
    return (
        <aside className="panel-navigation">
            <Link to={routes.INDEX} className="item-navigation">
                Catalogo
            </Link>

            <Link to={routes.ORDERS} className="item-navigation">
                Pedidos

                <span className="badge">2</span>
            </Link>

            <Link to={routes.DEALERS} className="item-navigation">
                Repartidores
            </Link>

            <Link to={routes.COMBOS} className="item-navigation">
                Combos
            </Link>

            <Link to={routes.REPORTS} className="item-navigation">
                Reportes
            </Link>

            <Link to={routes.COOOKROOM} className="item-navigation">
                Cocina
            </Link>
        </aside>
    )
}

export default Panel