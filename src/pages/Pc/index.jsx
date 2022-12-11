import React, {} from "react";
import Index from './Index/index'
import Msg from './Msg/index'
import OrderList from './OrderList/index'
import OrderListEvaluate from './OrderListEvaluate/index'
const Pc = (props) => {
    return <>
        {props.children}
    </>
}

const RenderRouter = () => {
    return <Pc>
        <Index/>
        <Msg/>
        <OrderList/>
        <OrderListEvaluate></OrderListEvaluate>
    </Pc>
}


export default RenderRouter;
