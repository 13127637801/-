import React, {} from "react";
import List from './List/index'
import HostList from './HotList/index'
import Search from './Search/index'
import Detail from './Detail/index'

const Project = (props) => {
    return <>
        {props.children}
    </>
}

const RenderRouter = () => {
    return <Project>
        <List></List>
        <HostList></HostList>
        <Search></Search>
        <Detail></Detail>
    </Project>
}


export default RenderRouter;
