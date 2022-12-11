import React, {useEffect, useState} from "react"
import {
    Route, Link
} from 'react-router-dom'
import style from './index.module.less'
import {welcome} from "../../../services/index"
import {
    getParams //获取url中的参数
} from '../../../utils/tool'


const Shop = (props) => {
    //商品信息
    const [shop, setShop] = useState({});
    //用户信息
    const [userInfo, setUserInfo] = useState({});


    //http://localhost:3000/apis/welcome/getShopMsg?shopId=b9a5eea53c8d4f154174dbff53892e24&userId=orH6d1BlTsF3LiogJRJ3322BPREaSzz8#/welcome/shop
    //调用接口拿去数据
    useEffect(() => {
        welcome.getShopData(getParams("shopId"))
            .then((data) => {
                //console.log(data);
                setShop(data.data)
            })

        welcome.getUserInfo(getParams("userId"))
            .then((data) => {
                //console.log(data);
                setUserInfo(data.data)
            })
    }, []);


    return <div className={style.shop}>
        <h2>
            <span>{shop.shop_name}</span>
        </h2>
        <section>
            欢迎光临，{userInfo.nickname}
        </section>
        <Link to="/welcome/selectPeople" className={style.btn}>开始点餐结账</Link>
    </div>
}
//抛出路由
const RenderRouter = () => {
    return <Route path="/welcome/shop" exact component={Shop}/>
}

export default RenderRouter
