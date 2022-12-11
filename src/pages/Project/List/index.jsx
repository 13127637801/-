import React, {useEffect, useState} from "react"
import BScroll from '@better-scroll/core' //每次改变都要refresh一下
import {
    Route, Link
} from 'react-router-dom'
import style from './index.module.less'
import {project} from "../../../services/index"
import {
    getParams
} from '../../../utils/tool'
import SearchBtn from "../../../components/SearchBtn/index"
import BtnLink from "../../../components/BtnLink";
import MenuItems from "../../../components/MenuItems";
import Nav from "../../../components/Nav";
import CallOut from "../../../components/CallOut"


const List = (props) => {


    //保存商品信息
    const [list, setList] = useState([])
    //
    const {history} = props;
    //betterScroll对象
    const [scroll, setScroll] = useState(null)
    //控制服务铃的显示隐藏
    const [callOut, setCallOut] = useState(false)


    //初始化
    useEffect(() => {
        //初始化betterScroll对象
        let scroll = new BScroll("#scroll", {
            click: true
        })
        setScroll(scroll);//保存到状态

        scroll.on('refresh', () => {
            let imgs = document.getElementsByClassName("imgsss");
            for (let i = 0; i < 12; i++) {
                if(window.isElementInViewport(imgs[i])){
                    let src = imgs[i].getAttribute("lazy-src");
                    imgs[i].setAttribute("src",src);
                }
            }
        })

        scroll.on('scrollEnd', () => {
            let imgs = document.getElementsByClassName("imgsss");
            for (let i = 0; i < imgs.length; i++) {
                if(window.isElementInViewport(imgs[i])){
                    let src = imgs[i].getAttribute("lazy-src");
                    imgs[i].setAttribute("src",src);
                }
            }
        })



        //请求数据
        project.getMenuList({id: getParams("shopId")})
            .then((data) => {
                setList(data.data.kindMenus)
                scroll.refresh()//更新滚动
            })
        //销毁滚动对象
        return () => {
            scroll.destroy()
        };

    }, []);

    //传递给侧边栏去滚动自己的菜单到指定位置
    const findToClass = (index) => {
        console.log(index);
        let top = document.getElementById(index).offsetTop //计算出偏移量，并滚动
        scroll.scrollTo(0, -top, 1000)
    }

    //呼叫
    const sure = () => {
        project.callOut({
            shopId: getParams('shopId'),
            tableNum: getParams('tableNum'),
            userId: getParams('userId')
        }).then(() => {
            setCallOut(false)
        })
    }

    return <div>
        {/*搜索按钮*/}
        <SearchBtn cb={() => {
            history.push("/project/search")
        }} icon="icon-search"/>
        {/*购物车*/}
        <BtnLink cb={() => {
            history.push("/shopCar")
        }} icon="icon-publishgoods_fill" style={{bottom: "0.4rem", right: "0.2rem"}}>购物车</BtnLink>
        {/*左侧菜单*/}
        <MenuItems findToClass={findToClass} list={list}></MenuItems>
        {/*底部导航栏*/}
        <Nav/>
        {/*呼叫服务员*/}
        {
            callOut && <CallOut cancel={() => setCallOut(false)} sure={sure}/>
        }
        {/*主体滚动内容*/}
        <div id="scroll" className={style.list}>
            <main>
                {/*主体导航栏*/}
                <nav>
                    <Link to="/project/list">
                        <i className="iconfont icon-examineandapprove"></i>
                        <span>随便点</span>
                    </Link>
                    <Link to="/project/hotlist">
                        <i className="iconfont icon-flag_fill"></i>
                        <span>热销榜</span>
                    </Link>
                    <Link to="/project/list">
                        <i className="iconfont icon-document_fill"></i>
                        <span>点过的菜</span>
                    </Link>
                    <a onClick={() => {
                        setCallOut(true);
                    }}>
                        <i className="iconfont icon-remind_fill"></i>
                        <span>服务铃</span>
                    </a>
                </nav>
                {/*各种菜品分类以及简要信息渲染*/}
                {
                    list.map((item, i) => {
                        let {items = {}, index, name} = item;
                        return <section key={index} id={index}>
                            <h3>{name}</h3>
                            <ul>
                                {
                                    items.map((jtem, j) => {
                                        let {name, imagePath, price, memberPrice, id} = jtem;
                                        return <li key={j} onClick={() => {
                                            history.push("/project/detail/" + id)
                                        }}>
                                            <img lazy-src={imagePath} className="imgsss" src={2} alt=""/>
                                            <h4>{name}</h4>
                                            <b>会员价：￥{memberPrice}</b>
                                            <span>原价：￥{price}</span>
                                        </li>
                                    })
                                }
                            </ul>
                        </section>
                    })
                }
            </main>
        </div>
    </div>
}

const RenderRouter = () => {
    return <Route path="/project/list" exact component={List}/>
}

export default RenderRouter
