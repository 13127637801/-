import React, {useEffect} from "react";
import styles from './index.module.less'

//商品列表页  传入商品列表以及scroll用来refresh数据保持betterScroll可以正常使用
export default (props) => {
    const {list, scroll,hot} = props
    console.log(list);

    useEffect(() => {
        if (scroll)
            scroll.refresh()
    }, [])


    return <ul className={styles.list}>
        {
            list.map((item, index) => {
                return <li key={index}>
                    <aside>
                        <img className={hot} lazy-src={item.imagePath} src={2} alt=""/>
                        <h4>{item.name}</h4>
                    </aside>
                    <aside>
                        <div>第
                            <p>
                                <b>{index + 1}</b>
                                <i className="iconfont icon-like_fill"></i>
                            </p>
                            名
                        </div>
                        <span>已售{item.soldCount}份</span>
                    </aside>
                </li>
            })
        }
    </ul>
}
