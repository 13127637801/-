const express = require('express')

const router = express.Router();
const fileHandler = require('../utils/fileHandle')
const Unique = require('../utils/Unique')
const creatTime = require('../utils/creatTime')
const {readMenuList, getUsers} = require("./common/getInfo")

//下单
router.post('/sendOrder', async (req, res, next) => {
    const {shopId, tableNum, userId} = req.body //客户端传来店铺id

    //获取购物车数据
    let data = await fileHandler.read("../files/shopCar")
    let arr = data.filter(item => {
        return item.shopId == shopId && item.tableNum == tableNum;
    })

    //拿到所有的菜单详情
    let allMenus = await readMenuList(shopId)

    const allPrice = allMenus.reduce((pre, item) => {
        let obj;
        arr.find((jtem) => {
            if (item.id == jtem.menuId) {
                obj = Object.assign({}, item, jtem);
            }
        })
        if (obj) {
            pre = pre + (obj.count * obj.price);
        }
        return pre
    }, 0)

    console.log(allPrice);
    let result = {
        id: Unique(),
        userId,
        shopId,
        tableNum,
        menus: arr,
        allPrice: allPrice,
        isPay: false
    }

    await fileHandler.add("../files/order", result)

    for (const item of arr) {
        await fileHandler.remove('../files/shopCar', "id", item.id)
    }

    //清除table
    let tableArr = await fileHandler.read("../files/table")
    tableArr = tableArr.filter((item) => {
        return item.shopId == shopId && item.tableNum == tableNum
    })

    for (const item of tableArr) {
        await fileHandler.remove('../files/table', "id", item.id)
    }


    //返回客户端信息
    res.send({
        code: 200,
        data: result,
        msg: 'OK'
    })
});


//获取订单
router.get('/getOrder', async (req, res, next) => {
    const {shopId, tableNum} = req.query //客户端传来店铺id

    let allOrder = await fileHandler.read('../files/order')
    let result = allOrder.find(item => {
        return item.shopId == shopId && item.tableNum == tableNum && item.isPay == false
    })

    result = result || {}
    let data = await readMenuList(shopId)
    if (result.menus) {
        result.menus = result.menus.map((item) => {
            let obj = data.find(jtem => {
                if (jtem.id == item.menuId) {
                    return true
                }
                return false
            })
            delete obj.id
            Object.assign(item, obj)
            return item
        })
    }

    //返回客户端信息
    res.send({
        code: 200,
        data: result || {},
        msg: 'OK'
    })
});


//支付接口
router.post('/pay', async (req, res, next) => {
    const {shopId, tableNum} = req.body //客户端传来店铺id

    let allOrder = await fileHandler.read('../files/order')
    let data = allOrder.map(item => {
        if (item.shopId == shopId && item.tableNum == tableNum && item.isPay == false) {
            item.isPay = true
            item.time = creatTime()
        }
        return item
    })

    await fileHandler.write("../files/order", data)

    //返回客户端信息
    res.send({
        code: 200,
        msg: 'OK'
    })
});


module.exports = router




