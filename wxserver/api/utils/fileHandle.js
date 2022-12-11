const fs = require("fs")
const path = require("path")

module.exports = {
    //写入
    write(url, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, url), JSON.stringify(data), "utf-8", (err) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve()
            })
        })
    },

    read(url) {
        //读取文件
        return new Promise((resolve, reject) => {
            //读取文件
            fs.readFile(path.resolve(__dirname, url), "utf-8", (err, data) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(JSON.parse(data))
            })
        })
    },

    //增加
    async add(url, data) {
        let result = await this.read(url)
        result.push(data)
        await this.write(url, result)
    },

    //修改
    async amend(url, data) {
        let result = await this.read(url)
        result = result.map((item) => {
            if (item.id == data.id) {
                return data
            } else {
                return item
            }
        })
        await this.write(url, result)
    },

    //删除
    async remove(url, type, id) {
        let result = await this.read(url)
        result = result.filter((item) => {
            return item[type] != id
        })
        await this.write(url, result)
    }

}
