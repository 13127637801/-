const express = require('express')

const router = express.Router();
const fileHandler = require('../utils/fileHandle')
const Unique = require('../utils/Unique')
const creatTime = require('../utils/creatTime')
const {readMenuList, getUsers} = require("./common/getInfo")


const middle = async ({shopId, tableNum}) => {
    let allOrder = await fileHandler.read('../files/order')
    let state = allOrder.some(item => {
        return item.shopId == shopId && item.tableNum == tableNum && item.isPay == false
    })
    return state
}


//添加购物车
router.post('/sendShopCar', async (req, res, next) => {
    const {shopId, tableNum, userId, menuId, count} = req.body //客户端传来店铺id

    const state = await middle(req.body)
    if (state) {
        res.send({
            code: 200,
            state: false,
            msg: 'ok'
        })
        return false
    }

    let data = {
        id: Unique(),
        shopId,
        userId,
        menuId,
        tableNum: tableNum,
        count,
    }

    //看看购物车有没有当前菜单
    let arrData = await fileHandler.read("../files/shopCar")
    let result = arrData.find(item => {
        return item.shopId === shopId && item.menuId === menuId && item.tableNum === tableNum
    })
    //如果有当前菜单先删除
    if (result) {
        await fileHandler.remove("../files/shopCar", "id", result.id)
    }
    //
    await fileHandler.add("../files/shopCar", data)

    //返回客户端信息
    res.send({
        code: 200,
        msg: 'OK'
    })
});

//获取购物车数据
router.get('/getShopCar', async (req, res, next) => {
    let {shopId, tableNum} = req.query

    const state = await middle(req.query)
    if (state) {
        res.send({
            code: 200,
            state: false,
            msg: 'ok'
        })
        return false
    }



    let data = await fileHandler.read("../files/shopCar")
    //过滤出自己的菜单
    let result = data.filter(item => {
        return item.shopId === shopId && item.tableNum === tableNum
    })

    //获取当前店铺所有菜单
    let allMenus = await fileHandler.read("../files/memuList")

    allMenus = allMenus.find((item) => {
        return item.shopId === shopId
    })

    allMenus = allMenus ? allMenus.kindMenus : []

    let users = await getUsers()


    //数据的联合
    let menus = allMenus.reduce((pre, item) => {
        let arr = item.items.reduce((pre, jtem) => {
            let obj = result.find(ktem => {
                return jtem.id == ktem.menuId
            })

            if (obj) {
                let user = users.find(item => {
                    return item.id == obj.userId
                })
                let data = Object.assign({}, jtem, obj, {user})
                pre.push(data)
            }
            return pre
        }, [])
        if (arr.length > 0) {
            pre.push(Object.assign(item, {items: arr}))
        }
        return pre
    }, []);

    //用餐人数
    let table = await fileHandler.read('../files/table')
    table = table.find(item => {
        return item.shopId == shopId && item.tableNum == tableNum
    })

    //返回客户端信息
    res.send({
        code: 200,
        data: {
            table,
            menus
        },
        msg: 'OK'
    })


})

//修改用餐人数
router.post('/changePeople', async (req, res) => {
    let {shopId, tableNum, people} = req.body;
    let data = await fileHandler.read("../files/table")

    //修改数据
    data = data.map((item) => {
        if (item.shopId === shopId && item.tableNum === tableNum) {
            item.people = people
        }
        return item
    })

    await fileHandler.write("../files/table", data)
    res.send({
        code: 200,
        msg: 'ok'
    })
})

//修改购物车数量
router.get('/changeShopCar', async (req, res) => {
    let {id, count} = req.query;
    let data = await fileHandler.read("../files/shopCar")

    let result = data.find(item => {
        if (item.id == id) {
            return true
        }
        return false
    })

    if (result) {
        result.count = count;
    }

    await fileHandler.amend("../files/shopCar", result || {})

    res.send({
        code: 200,
        msg: 'ok'
    })
})


//清空购物车
router.get('/clearShopCar', async (req, res) => {
    let {shopId, tableNum} = req.query;

    let data = await fileHandler.read("../files/shopCar")

    let result = data.filter(item => {
        return item.shopId == shopId && item.tableNum == tableNum;
    })

    for (const item of result) {
        await fileHandler.remove("../files/shopCar", "id", item.id)
    }

    res.send({
        code: 200,
        msg: 'ok'
    })
})


module.exports = router




