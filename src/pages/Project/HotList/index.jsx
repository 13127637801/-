import React, {useEffect, useState} from "react";
import styles from './index.module.less'
import GoBack from '../../../components/GoBack'
import {
    Route
} from 'react-router-dom'
import {project} from '../../../services/index'
import {getParams} from "../../../utils/tool";
import ProjectList from '../../../components/ProjectList'
import BScroll from 'better-scroll'


const HotList = (props) => {
    //商品列表
    const [list, setList] = useState([]);
    //betterScroll对象
    const [scroll, setScroll] = useState(null);

    useEffect(() => {
        //初始化betterScroll
        const scroll = new BScroll('#scroll', {
            click: true
        });
        //保存到状态
        setScroll(scroll);

        scroll.on('refresh', () => {
            let imgs = document.getElementsByClassName("hotlazy");
            for (let i = 0; i < 12; i++) {
                if(window.isElementInViewport(imgs[i])){
                    let src = imgs[i].getAttribute("lazy-src");
                    imgs[i].setAttribute("src",src);
                }
            }
        })

        scroll.on('scrollEnd', () => {
            let imgs = document.getElementsByClassName("hotlazy");
            for (let i = 0; i < imgs.length; i++) {
                if(window.isElementInViewport(imgs[i])){
                    let src = imgs[i].getAttribute("lazy-src");
                    imgs[i].setAttribute("src",src);
                }
            }
        })


        //从文件中获取数据
        project.getMenuList({
            id: getParams('shopId'),
            type: "hot"
        }).then((data) => {
            // console.log(data);
            setList(data.data.sort((a, b) => {
                return b.soldCount - a.soldCount;
            }));
            //重新处理滚动
            scroll.refresh()//重新刷新scroll
        })
        //销毁滚动对象，防止内存泄漏
        return () => {
            scroll.destroy()
        }
    }, [])

    //渲染数据
    return <div className={styles.out}>
        {/*返回按钮*/}
        <GoBack {...props}>返回</GoBack>
        <div className={styles.list} id="scroll">
            <main>
                {/*提示文字*/}
                <nav>本店销量榜</nav>
                {/*商品列表*/}
                <ProjectList hot="hotlazy" scroll={scroll}  {...props} list={list}/>
            </main>
        </div>

    </div>
}


const RenderRouter = () => {
    return <Route path='/project/hotlist' exact component={HotList}/>
}


export default RenderRouter;
