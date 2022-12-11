import React, {useState} from "react";
import styles from './index.module.less'
import {
    Link
} from 'react-router-dom'

//底部导航
const Nav = () => {
    const [state, setState] = useState(false);

    return <div className={styles.nav}>
        {
            state ? <div className={styles.navList}>
                <section>
                    <Link to="/project/list">
                        <p>
                            <i className="iconfont icon-createtask"></i>
                        </p>
                        <span>菜单</span>
                    </Link>
                    <Link to="/shopCar">
                        <p>
                            <i className="iconfont icon-publishgoods_fill"></i>
                        </p>
                        <span>购物车</span>
                    </Link>
                    <Link to="/order">
                        <p>
                            <i className="iconfont icon-document"></i>
                        </p>
                        <span>已下单的菜</span>
                    </Link>
                    <Link to="/pc/index">
                        <p>
                            <i className="iconfont icon-addressbook"></i>
                        </p>
                        <span>会员中心</span>
                    </Link>
                    <a onClick={()=>{setState(false)}}>
                        <p>
                            <i className="iconfont icon-close"></i>
                        </p>
                        <span>返回</span>
                    </a>
                </section>
            </div> : <p onClick={()=>{setState(true)}} className={styles.navText}>
                <span>导航</span>
            </p>
        }

    </div>
}

export default Nav
