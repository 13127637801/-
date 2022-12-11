const express = require('express')

const router = express.Router();
const fileHandler = require('../utils/fileHandle')
const Unique = require('../utils/Unique')
const creatTime = require('../utils/creatTime')
const {readMenuList, getUsers} = require("./common/getInfo")

//修改个人信息
router.post('/changeUser', async (req, res, next) => {
    const {id, phone, sex, email} = req.body //
    let data = await fileHandler.read("../files/users")
    let result = data.map((item) => {
        if (item.id == id) {
            Object.assign(item, req.body)
        }
        return item
    })
    await fileHandler.write("../files/users", result)
    //返回客户端信息
    res.send({
        code: 200,
        msg: 'OK'
    })
});


//获取订单
router.get('/getOrder', async (req, res, next) => {
    const {id, userId} = req.query //
    let allOrder = await fileHandler.read("../files/order")
    let result = allOrder.filter(item => {
        return item.userId == userId
    })

    //返回客户端信息
    res.send({
        code: 200,
        data: result || [],
        msg: 'OK'
    })
});

//评价订单
router.post("/evaluate", async (req, res, next) => {
    const {id, evaluate} = req.body
    let allOrder = await fileHandler.read("../files/order")
    let data = allOrder.map(item => {
        if (item.id == id) {
            item.evaluate = evaluate//对象
        }
        return item
    })

    await fileHandler.write("../files/order",data)

    res.send({
        code: 200,
        msg: 'OK'
    })

})

module.exports = router




