import React, {} from "react";
import styles from './inde.module.less'

//传入icon图表 style自定义样式 以及点击后的回调函数
const SearchBtn = (props) => {
    let {icon, style = {},cb} = props;
    return <p className={styles.searchBtn} style={style} onClick={cb}>
        <i className={"iconfont " + icon}></i>
    </p>
}


export default SearchBtn
