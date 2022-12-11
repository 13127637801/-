import React from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import App from '../app/index.jsx'
import Lazy from "./lazy";

const Welcome = Lazy(() => import('../pages/Welcome/index'))
const Project = Lazy(() => import('../pages/Project/index'))
const ShopCar = Lazy(() => import('../pages/ShopCar/index'))
const Order = Lazy(() => import('../pages/Order/index'))
const Pc = Lazy(() => import('../pages/Pc/index.jsx'))


//一级路由，二级路由分发给各个组件
function BaseRouter() {
    return <Router basename='/'>
        <App>
            <Switch>
                <Route path='/' exact component={() => {
                    return <Redirect to='/welcome/shop'/>
                }}/>
                <Route path='/welcome' component={Welcome}/>

                <Route path='/project' component={Project}/>
                <Route path='/shopCar' component={ShopCar}/>
                <Route path='/order' component={Order}/>
                <Route path='/pc' component={Pc}/>


            </Switch>
        </App>
    </Router>
}

export default BaseRouter
