const express = require('express')

const router = express.Router();
const fileHandler = require('../utils/fileHandle')
const Unique = require('../utils/Unique')
const creatTime = require('../utils/creatTime')

//获取店铺信息
router.get('/getShopMsg', async (req, res, next) => {
    const {id} = req.query //客户端传来id
    let data = await fileHandler.read("../files/shop") //读取出商品信息
    const result = data.find(item => { //找到需要的商品
        return item.id == id;
    })
    //返回客户端信息
    res.send({
        code: 200,
        data: result || {},
        msg: 'OK'
    })
});

//获取用户信息
router.get('/getUserMsg', async (req, res, next) => {
    const {id} = req.query //客户端传来id
    let data = await fileHandler.read("../files/users") //读取出商品信息
    const result = data.find(item => { //找到需要的商品
        return item.id == id;
    })
    //返回客户端信息
    res.send({
        code: 200,
        data: result || {},
        msg: 'OK'
    })
});

//添加用餐人数
router.post('/addPeople', async (req, res, next) => {

    const {shopId, userId, tableNum, people} = req.body //客户端传来数据
    const data = {
        id: Unique(),
        shopId:shopId,
        userId:userId,
        tableNum:tableNum,
        people:people,
        creatTime: creatTime()
    }
    //存储数据
    await fileHandler.add("../files/table", data) //读取出商品信息

    //返回客户端信息
    res.send({
        code: 200,
        msg: 'OK'
    })
});

module.exports = router




