const fileHandler = require('../../utils/fileHandle')


module.exports = {
    async readMenuList(id) {//店铺id
        let allMenus = await fileHandler.read("../files/memuList")
        allMenus = allMenus.find((item) => { //找到这家店
            return item.shopId === id;
        })
        allMenus = allMenus ? allMenus.kindMenus : []
        //拿到所有的店铺菜单商品
        return allMenus.reduce((pre, jtem) => {
            pre.push(...jtem.items)
            return pre
        }, [])
    },

    async getUsers() {
        let users = await fileHandler.read("../files/users")
        return users
    }


}

