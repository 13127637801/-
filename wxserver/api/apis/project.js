const express = require('express')

const router = express.Router();
const fileHandler = require('../utils/fileHandle')
const Unique = require('../utils/Unique')
const creatTime = require('../utils/creatTime')
const {readMenuList} = require("./common/getInfo")

//获取店铺信息byId
//http://localhost:3000/api/project/getMenuList?id=b9a5eea53c8d4f154174dbff53892e24&search=%E5%85%A8%E7%89%9B
router.get('/getMenuList', async (req, res, next) => {
    const {id, type, search} = req.query //客户端传来店铺id
    let data = await fileHandler.read("../files/memuList") //读取出店铺信息

    let result = data.find(item => {
        return item.shopId == id; //找出自家店铺，可能有多家
    })

    //热销功能
    if (type === "hot") {
        result = result ? result.kindMenus.reduce((pre, jtem) => {
            jtem.items.forEach((j) => {
                if (j.hot) {
                    pre.push(j);
                }
            })
            return pre
        }, []) : []
    }

    //搜索功能
    if (search !== undefined) {
        result = result ? result.kindMenus.reduce((pre, jtem) => {
            jtem.items.forEach((j) => {
                if (j.name.includes(search)) {
                    pre.push(j);
                }
            })
            return pre
        }, []) : []
    }


    //返回客户端信息
    res.send({
        code: 200,
        data: result || {},
        msg: 'OK'
    })
});

//呼叫服务员    http://localhost:3000/api/project/callOut
router.post('/callOut', async (req, res, next) => {
    const {shopId, tableNum, userId} = req.body //客户端店铺id，桌号
    const result = {
        id: Unique(),
        shopId,
        tableNum,
        userId,
        creatTime: creatTime()
    }
    await fileHandler.add("../files/callOut", result) //呼叫服务员
    //服务推送到后台接受

    //返回客户端信息
    res.send({
        code: 200,
        msg: 'OK'
    })
});

//菜单详情
router.get('/getMenuDetail', async (req, res, next) => {
    const {shopId, id} = req.query //客户端店铺id，菜单id

    let datas = await readMenuList(shopId)

    let result = datas.find((item) => {
        return item.id === id
    })

    //返回客户端信息
    res.send({
        code: 200,
        data: result || [],
        msg: 'OK'
    })
});


module.exports = router




