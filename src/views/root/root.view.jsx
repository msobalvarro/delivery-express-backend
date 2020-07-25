import React from "react"

// import route configuration
import { Route, Switch } from "react-router-dom"

// import constant and functions
import routes from "../../utils/routes.config"

// impoer all views
import CatalogueView from "../catalogue/catalogue.view"
import OrdersView from "../orders/orders.view"

const RootView = () => {
    return (
        <Switch>
            <Route path={routes.INDEX} exact component={CatalogueView} />
            <Route path={routes.ORDERS} exact component={OrdersView} />
        </Switch>
    )
}

export default RootView