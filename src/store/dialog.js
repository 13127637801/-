import {decorate, observable, action} from 'mobx'

//仓库
class Control {
    msg = "操作成功"
    type = "success"
    show = false
    //定义方法
    change = action(({msg, type = "success", show}) => {
        this.msg = msg
        this.type = type
        this.show = show
    })
}
//监听数据
decorate(Control, {
    msg: observable,
    type: observable,
    show: observable,
})

export default new Control()
