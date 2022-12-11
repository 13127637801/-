import React, {} from "react";
import Shop from './Shop/index'
import SelectPeople from './SelectPeople/index'

//http://localhost:3000/?shopId=b9a5eea53c8d4f154174dbff53892e24&userId=orH6d1BlTsF3LiogJRJ3322BPREaSzz8&tableNum=58#/welcome/selectPeople

const Welcome = (props) => {
    return <>
        {props.children}
    </>
}

const RenderRouter = () => {
    return <Welcome>
        <Shop></Shop>
        <SelectPeople></SelectPeople>
    </Welcome>
}


export default RenderRouter;
