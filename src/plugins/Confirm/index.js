import temp from './index.vue'

/*
* 参数都是非必穿的
* @title {String} 代表标题
* @content {String} 代表提示内容
* @cancelText {String} 代表取消的文字
* @confirmText {String} 代表确认的文字
* @confirm {Function} 提交的回调函数
* @cancel {Function} 取消的回调函数
* this.$Confirm.open({
   title: '三维模型编辑器',
   content: '提示内容',
   confirm () { console.log('确认') },
   cancel () { console.log('取消') }
 })
* */
const install = function (Vue) {
  const Control = Vue.extend(temp)
  const instance = new Control()
  let dom = document.createElement('div')
  instance.$mount(dom)
  document.body.appendChild(instance.$el)
  Vue.prototype.$Confirm = {
    open (obj = {}) {
      let { title = '', content = '', cancelText = '取消', confirmText = '确认' } = obj

      instance.title = title
      instance.content = content
      instance.cancelText = cancelText
      instance.confirmText = confirmText

      instance.$props.confirm = obj.confirm
      instance.$props.cancel = obj.cancel

      instance.onOpen()
    },
    cancel () {
      instance.cancelEvent()
    }
  }
}

export default {
  install
}
