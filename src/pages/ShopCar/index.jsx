import React, {useEffect, useMemo, useState} from "react";
import styles from './index.module.less'
import Nav from "../../components/Nav";
import BtnLink from "../../components/BtnLink";
import {shopCar, order} from '../../services/index'
import {getParams} from "../../utils/tool";
import {observer} from 'mobx-react'
import {shopCar as store} from '../../store'

const ShopCar = observer((props) => {
    const {history, store} = props
    const {data, change} = store
    const [changePState, setChangePState] = useState(false)
    // const [data, setData] = useState({})
    const [people, setPeople] = useState(0)

    useEffect(() => {
        shopCar.getShopCar({
            shopId: getParams("shopId"),
            tableNum: getParams("tableNum")
        }).then(data => {
            // setData(data.data)
            console.log(data);
            //有未支付订单
            if (data.state == false) {

                alert("有未支付订单", "success")
                setTimeout(() => {
                    history.push("/order")
                }, 1000)

                return
            }

            change(data.data)

            setPeople(data.data.table.people)

        })
    }, [])

    //动态计算总价
    let allPrice = useMemo(() => {
        let {menus = []} = data
        return menus.reduce((pre, item) => {
            let {items} = item;
            let res = items.reduce((pre, jtem) => {
                pre = pre + jtem.price * jtem.count
                return pre
            }, 0)
            pre = pre + res
            return pre
        }, 0)
    })

    //修改用餐人数
    const changPeopleH = () => {
        console.log(people);
        shopCar.changePeople({
            people,
            shopId: getParams("shopId"),
            tableNum: getParams("tableNum")
        }).then(() => {
            alert("修改人数成功", "success")
            setChangePState(false)
        })
    }

    //修改购物车数量
    const changeNum = (type, item) => {
        if (type == "+") {
            item.count++;
        } else if (item.count > 1 && type == "-") {
            item.count--;
        }
        shopCar.changeShopCar({
            id: item.id,
            count: item.count
        }).then(() => {

        })
    }

    const clearShop = () => {
        shopCar.clearShopCar({
            shopId: getParams("shopId"),
            tableNum: getParams("tableNum")
        }).then(() => {
            history.push("/project/list")
        })
    }


    const sendOrder = () => {
        order.sendOrder({
            shopId: getParams("shopId"),
            tableNum: getParams("tableNum"),
            userId:getParams("userId")
        }).then(()=>{
            history.push("/order")
        })
    }


    return <div className={styles.shop}>
        <Nav {...props}/>
        <BtnLink icon="icon-createtask" style={{bottom: '0.4rem', left: '3.25rem'}} cb={() => {
            history.push("/project/list")
        }}>点菜</BtnLink>

        <BtnLink icon="icon-right" style={{bottom: '0.4rem', right: '0.2rem'}} cb={() => {
            sendOrder()
        }}>下单</BtnLink>


        <main>
            <div className={styles.top}>
                <h2>购物车</h2>
                <section>
                    <aside>
                        <p>
                            用餐人数：{changePState ?
                            <input type="text" value={people} onChange={(e) => {
                                setPeople(e.target.value)
                            }} onBlur={changPeopleH}/>
                            : <span>{people}</span>}人
                        </p>
                        <span>备注：无</span>
                    </aside>
                    <aside onClick={() => setChangePState(true)} className={styles.topAsideRight}>
                        <i className="iconfont icon-setup"></i>
                        <p>修改</p>
                    </aside>
                </section>
                <section>
                    <aside>
                        <span>购物车里有：{
                            data.menus && data.menus.map((item, index) => {
                                return item.name + item.items.length + "个 "
                            })
                        }</span>
                        <b>合计：￥{allPrice}</b>
                    </aside>
                    <aside onClick={clearShop} className={styles.topAsideRight}>
                        <i className="iconfont icon-empty"></i>
                        <p>清空</p>
                    </aside>
                </section>
            </div>
            {
                data.menus && data.menus.map((item, index) => {
                    let {items} = item
                    return <div className={styles.item} key={index}>
                        <h2>{item.name}</h2>
                        {
                            items.map((jtem,jndex) => {
                                return <section key={jndex}>
                                    <aside className={styles.itemLeft}>
                                        <p>
                                            <img src={jtem.user.url} alt=""/>
                                            <span>{jtem.user.nickname}</span>
                                        </p>
                                        <aside>
                                            <h4>{jtem.name}</h4>
                                            <p>￥{jtem.price}</p>
                                        </aside>
                                    </aside>

                                    <aside className={styles.itemRight}>
                                        <p>
                                            <b onClick={() => changeNum("-", jtem)}>-</b>
                                            <span>{jtem.count}{jtem.account}</span>
                                            <b onClick={() => changeNum("+", jtem)}>+</b>
                                        </p>
                                    </aside>
                                </section>
                            })
                        }
                    </div>
                })
            }
        </main>

    </div>
})


export default (props) => <ShopCar {...props} store={store}/>
