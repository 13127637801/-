import React, {useState} from "react";
import styles from './index.module.less'

export default (props) => {

    const change = (num) => {
        let result = props.defaultV + num
        props.getScore(result)
    }


    return <p className={styles.evaluate}>
        {
            Array.from(new Array(5)).map((i, index) => {
                if (index < props.defaultV) {
                    return <i onClick={() => change(-1)} className="iconfont icon-collection_fill"></i>
                } else {
                    return <i onClick={() => change(1)} className="iconfont icon-collection"></i>

                }
            })
        }
    </p>
}
