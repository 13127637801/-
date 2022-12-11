import React, {useEffect, useState} from "react";
import styles from './index.module.less'
import {
    Route
} from 'react-router-dom'
import {project, shopCar} from "../../../services"
import {getParams, serialize} from "../../../utils/tool";
import GoBack from '../../../components/GoBack'


const Detail = (props) => {
    const {match, history} = props
    const {id} = match.params
    const [data, setData] = useState({})
    const [count, setCount] = useState(1)

    useEffect(() => {
        project.getMenuDetail({
            shopId: getParams("shopId"),
            id: id
        }).then((data) => {
            setData(data.data)
        })
    }, [])

    const submit = () => {
        shopCar.sendShopCar({
            shopId: getParams("shopId"),
            userId: getParams("userId"),
            tableNum: getParams("tableNum"),
            menuId: id,
            count: count
        }).then((data) => {
            if (data.state == false) {

                alert("有未支付订单", "success")
                setTimeout(() => {
                    history.push("/order")
                }, 1000)

                return
            }

            alert("购物车添加成功", "success")
            setTimeout(() => {
                history.push("/shopCar")
            }, 1000)
        })
    }


    return <div className={styles.detail}>
        <GoBack {...props}>返回</GoBack>
        <img src={data.imagePath} alt=""/>
        <section>
            <h3>{data.name}</h3>
            <p>￥{serialize(data.price)}/{data.account}</p>
        </section>
        <footer>
            <aside>
                <label htmlFor="">数量</label>
                <p>
                    <b onClick={() => setCount(count > 1 ? count - 1 : count)}>-</b>
                    <span>{count}{data.account}</span>
                    <b onClick={() => setCount(count + 1)}>+</b>
                </p>
            </aside>
            <button className={styles.shop} onClick={submit}>加入购物车</button>
        </footer>
    </div>
}

const RenderRouter = () => {
    return <Route path="/project/detail/:id" component={Detail}/>
}


export default RenderRouter
