import React, {useEffect, useState} from "react";
import styles from './inde.module.less'
import BScroll from 'better-scroll'

// 左侧弹出菜单 传入要渲染的列表 以及传入点击后需要scroll的父级回调方法
const MenuItems = (props) => {
    let {list, findToClass} = props;
    const [active, setActive] = useState(false);
    const [scroll, setScroll] = useState(null)

    useEffect(() => {
        const scroll = new BScroll("#leftScroll", {
            click: true
        })
        setScroll(scroll);
        return () => {
            scroll.destroy();
        }
    }, [])

    useEffect(() => {
        if (scroll)
            scroll.refresh()
    }, [list])

    //每个分类的id，为了滚动
    const findTo = (index) => {
        setActive(false)//隐藏自身 根据active是否隐藏自身
        findToClass(index) //调用父级方法进行滚动
    }

    return <div className={active ? (styles.active + " " + styles.menuItems) : styles.menuItems}>
        <aside className={styles.asideLeft} id="leftScroll">
            <main>
                <ul>
                    <li>分类</li>
                    <li>
                        <i className="iconfont icon-flag_fill"></i>
                        本周销量榜
                    </li>
                    <li>
                        <i className="iconfont icon-document_fill"></i>
                        点过的菜
                    </li>
                </ul>
                <ul>
                    {
                        list.map((item, i) => {
                            let {items = [], index, name} = item;
                            return <li key={index} onClick={() => findTo(index)}>
                                {name}
                            </li>
                        })
                    }
                </ul>
            </main>
            <p onClick={() => {
                setActive(!active)
            }}>
                <i className="iconfont icon-other"></i>
                <span>分类</span>
            </p>
        </aside>
        <aside className={styles.asideRight}>

        </aside>
    </div>
}


export default MenuItems
