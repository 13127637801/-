import React, {useEffect, useState} from "react"
import {
    Route, Link
} from 'react-router-dom'
import styles from './index.module.less'
import {welcome} from "../../../services/index"
import {
    getParams
} from '../../../utils/tool'
//http://localhost:3000/?shopId=b9a5eea53c8d4f154174dbff53892e24&userId=orH6d1BlTsF3LiogJRJ3322BPREaSzz8&tableNum=58#/welcome/selectPeople

//选择人数页面
const SelectPeople = (props) => {
    const [activeNum, setActiveNum] = useState(0) //点击高亮
    const [tableNum, setTableNum] = useState(0); //桌号

    //获得信息
    useEffect(() => {
        setTableNum(getParams('tableNum'));
    }, [])

    //提交信息到文件
    const submit = () => {
        let data = {
            shopId: getParams('shopId'),
            userId: getParams("userId"),
            tableNum: getParams('tableNum'),
            people: activeNum,
        }

        welcome.addPeople(data).then((data) => {
            console.log(data);
            alert("提交成功", "success", 1000) //提示动画展示
            setTimeout(() => {
                props.history.push('/project/list')
            }, 1000)
        })

    }

    //页面
    return <div className={styles.selectPeople}>
        <h3>{tableNum}号</h3>
        <div>用餐人数</div>
        <span>请选择正确的用餐人数</span>
        <ul>
            {
                [...new Array(8)].map((item, index) => {
                    return <li className={activeNum == index + 1 ? styles.active : ''} key={index}
                               onClick={() => setActiveNum(index + 1)}>{index + 1}</li>
                })
            }
        </ul>
        <p className={styles.btn} onClick={submit}>开始点餐</p>
    </div>
}
//抛出路由
const RenderRouter = () => {
    return <Route path="/welcome/selectPeople" exact component={SelectPeople}/>
}

export default RenderRouter
