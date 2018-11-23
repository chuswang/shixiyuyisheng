import temp from './index.vue'
let Toast = {};

Toast.install = function(Vue) {

  Vue.prototype.$toast = options => {
    const Control = Vue.extend(temp);
    const instance = new Control().$mount();
    instance.tips = options.tips;
    document.body.appendChild(instance.$el);
    setTimeout(()=>{
      document.body.removeChild(instance.$el);
    },3000)
  }
}
export default Toast;