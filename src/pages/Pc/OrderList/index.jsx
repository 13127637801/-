import React, {useEffect, useState} from "react";
import {Link, Route} from 'react-router-dom'
import styles from "./index.module.less"
import {welcome, pc} from '../../../services/index'
import {getParams} from "../../../utils/tool";
import GoBack from '../../../components/GoBack'

const OrderList = (props) => {
    const [list, setList] = useState([])
    const [shop, setShop] = useState({})

    const {history} = props

    useEffect(() => {
        pc.getOrder({
            userId: getParams("userId")
        }).then((data) => {
            console.log(data.data);
            setList(data.data)
        })

        welcome.getShopData(getParams("shopId")).then((data) => {
            console.log(data.data);
            setShop(data.data)
        })


    }, [])


    return <div className={styles.index}>
        <GoBack style={{top: "0.1rem", left: "0.1rem"}} {...props}>返回</GoBack>
        <main>
            <div className={styles.scrollCon}>
                <h2>我的订单</h2>

                {
                    list.map((item, index) => {
                        return <div key={index} className={styles.item}>
                            <section>
                                <aside>
                                    <b>{shop.shop_name}</b>
                                    <span>{item.time}</span>
                                </aside>
                                <a href={"tel:" + shop.shopPhone}>
                                    <i className="iconfont icon-customerservice_fill"></i>
                                </a>
                            </section>
                            <ul>
                                <li>
                                    订单金额：<span>￥{item.allPrice}</span>
                                </li>
                                <li>
                                    订单状态：<span>{item.isPay ? "已支付" : "未支付"}</span>
                                </li>
                                <li>
                                    订单编号：<span>{item.id.substr(0, 10) + "..."}</span>
                                </li>
                            </ul>
                            <p>
                                <Link to={"/pc/orderListEvaluate/" + item.id}>我要评价</Link>
                            </p>
                        </div>
                    })
                }

            </div>
        </main>
    </div>
}

const RenderRouter = (props) => {
    return <Route path='/pc/orderList' component={OrderList}/>
}

export default RenderRouter
