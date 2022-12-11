import React, {} from "react";
import styles from './inde.module.less'
import {dialog} from '../../store/index'
import {observer} from 'mobx-react'

//封装提示消息alert方法用来进行提示

//绑定mobx数据实现数据监听
const Msg = observer((props) => {
    let {msg, type, show} = props.dialog; //根据信息是否显示组件以及组件信息
    return show ? <div className={styles.msg}>
        <main>
            <i className={type == "success" ? "iconfont icon-prompt_fill " + styles.success :
                "iconfont icon-prompt_fill " + styles.error}></i>
            <h2>{msg}</h2>
        </main>
    </div> : null
})

window.alert = (msg, type, time = 1000) => {
    dialog.change({
        msg,
        type,
        show: true
    });
    setTimeout(() => {
        dialog.change({msg: "", type: "", show: false});
    }, time)
}


export default () => <Msg dialog={dialog}/>//传递mobx数据到组件
