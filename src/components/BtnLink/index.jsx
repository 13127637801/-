import React, {} from "react";
import styles from './inde.module.less'


//props传入图标icon  点击回调cb 自定义样式style
const BtnLink = (props) => {
    let {icon, style = {}, cb} = props;
    return <p className={styles.btn} style={style} onClick={cb}>
        <i className={"iconfont " + icon}></i>
        <span>{props.children}</span>
    </p>
}


export default BtnLink
