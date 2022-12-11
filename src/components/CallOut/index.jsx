import React, {} from "react";
import styles from './index.module.less'

//呼叫服务员 传入两个函数，分别对应两个按钮的回调函数
export default (props) => {
    const {cancel, sure} = props

    return <div className={styles.callOut}>
        <main>
            <h2>
                需要小二帮你叫服务生么?
            </h2>
            <section>
                <button onClick={cancel}>取消</button>
                <button onClick={sure}>叫服务生</button>
            </section>
        </main>
    </div>
}
