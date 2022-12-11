import React, {useEffect, useState} from "react";
import styles from './index.module.less'
import {Route} from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import ProjectList from "../../../components/ProjectList";
import {project} from '../../../services/index'
import {getParams} from "../../../utils/tool";
import BScroll from 'better-scroll'

const Search = (props) => {
    //搜索框输入的内容
    const [val, setVal] = useState("");
    //搜索结果的渲染list
    const [list, setList] = useState([])
    //滚动
    const [scroll, setScroll] = useState(null);
    //初始化
    useEffect(() => {
        //初始化滚动
        let scroll = new BScroll('#scroll', {
            click: true
        });
        setScroll(scroll);//设置状态给底部使用

        scroll.on('refresh', () => {
            let imgs = document.getElementsByClassName("searchlazy");
            for (let i = 0; i < 12; i++) {
                if(window.isElementInViewport(imgs[i])){
                    let src = imgs[i].getAttribute("lazy-src");
                    imgs[i].setAttribute("src",src);
                }
            }
        })

        scroll.on('scrollEnd', () => {
            let imgs = document.getElementsByClassName("searchlazy");
            for (let i = 0; i < imgs.length; i++) {
                if(window.isElementInViewport(imgs[i])){
                    let src = imgs[i].getAttribute("lazy-src");
                    imgs[i].setAttribute("src",src);
                }
            }
        })


        //销毁
        return () => {
            scroll.destroy()
        }
    }, [])

    //点击搜索后的回调时间
    const searchList = () => {
        project.getMenuList({
            id: getParams('shopId'),
            search: val
        }).then((data) => {
            setList(data.data);
            scroll.refresh()//重新激活滚动
        })
    }

    return <div>
        {/*返回组件按钮*/}
        <GoBack {...props}>返回</GoBack>
        {/*滚动主体内容区*/}
        <div className={styles.list} id="scroll">
            <main>
                {/*搜索输入框以及按钮等*/}
                <nav>
                    <i className="iconfont icon-search" onClick={searchList}></i>
                    <input type="text" value={val}
                           onChange={(e) => setVal(e.target.value)}/>
                    <i className="iconfont icon-delete_fill" onClick={() => setVal("")}></i>
                </nav>
                {/*搜索结果信息显示*/}
                {
                    list.length === 0 ? <p className={styles.none}>客官，请在输入框中输入菜单名称</p>
                        :
                        <section><ProjectList hot="searchlazy" scroll={scroll}  {...props} list={list}/></section>
                }
            </main>
        </div>
    </div>
}

const RenderRouter = () => {
    return <Route path='/project/search' exact component={Search}/>
}

export default RenderRouter
