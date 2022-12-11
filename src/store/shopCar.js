import {decorate, observable, action} from 'mobx'

//仓库
class Control {
    data = {}
    //定义方法
    change = action((arg) => {
        this.data = arg
    })
}

//监听数据
decorate(Control, {
    data: observable,
})

export default new Control()
