const welcom = require("./apis/welcome")
const project = require("./apis/project")
const shopCar = require("./apis/shopCar")
const order = require('./apis/order')
const pc = require('./apis/pc')
//路由
module.exports = (app) => {
    app.use("/api/welcome", welcom)
    app.use("/api/project", project)
    app.use("/api/shopCar", shopCar)
    app.use("/api/order", order)
    app.use("/api/pc", pc)
}
