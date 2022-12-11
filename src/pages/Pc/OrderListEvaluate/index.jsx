import React, {useEffect, useState} from "react";
import {Link, Route} from 'react-router-dom'
import styles from "./index.module.less"
import {welcome, pc} from '../../../services/index'
import {getParams} from "../../../utils/tool";
import GoBack from '../../../components/GoBack'
import Evaluate from '../../../components/Evaluate'


const OrderListEvaluate = (props) => {
    const [order, setOrder] = useState({})

    const {history, match} = props

    useEffect(() => {
        pc.getOrder({
            userId: getParams("userId")
        }).then((data) => {
            let result = data.data.find(item => {
                return item.id == match.params.id
            })
            setOrder(result || {})
            console.log(result);
        })

    }, [])

    //提交
    const submit = () => {
        let {evaluate} = order
        pc.evaluate({
            id: match.params.id,
            evaluate
        }).then(() => {
            alert("评价完成", "success")
            setTimeout(() => {
                history.go(-1);
            }, 1000)
        })

    }

    let evaluates = order.evaluate || {}
    let {evaluate = 0, taste = 0, speed = 0, environment = 0} = evaluates
    //操作星星，给子组件使用
    const getScore = (type, score) => {
        setOrder({
            ...order,
            ...{
                evaluate: {
                    ...order.evaluate,
                    [type]: score
                }
            }
        })
    }


    return <div className={styles.index}>
        <GoBack style={{top: "0.1rem", left: "0.1rem"}} {...props}>我的订单</GoBack>
        <main>
            <div className={styles.scrollCon}>

                <div className={styles.item}>
                    <h3>店铺评价</h3>
                    <ul>
                        <li>
                            评价：<Evaluate getScore={(score) => getScore("evaluate", score)} defaultV={evaluate}/>
                        </li>
                        <li>
                            菜肴口味：<Evaluate getScore={(score) => getScore("taste", score)} defaultV={taste}/>
                        </li>
                        <li>
                            上菜速度：<Evaluate getScore={(score) => getScore("speed", score)} defaultV={speed}/>
                        </li>
                        <li>
                            就餐环境：<Evaluate getScore={(score) => getScore("environment", score)}
                                           defaultV={environment}/>
                        </li>
                    </ul>
                    <p className={styles.btn}>
                        <button onClick={submit}>提交</button>
                    </p>
                </div>


            </div>
        </main>
    </div>
}

const RenderRouter = (props) => {
    return <Route path='/pc/orderListEvaluate/:id' component={OrderListEvaluate}/>
}

export default RenderRouter
