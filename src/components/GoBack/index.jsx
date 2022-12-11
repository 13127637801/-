import React, {} from "react";
import styles from './index.module.less'

//返回按钮 传入history对象用来改变路由
export default (props) => {

    const {history, style} = props;
    return <div className={styles.goback} style={style} onClick={() => {
        history.go(-1);//回退
    }}>
        <i className="iconfont icon-return"></i>
        <span>{props.children}</span>
    </div>
}
