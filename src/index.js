import Observer from '../observer'
import Compiler from '../compiler'

class Vue {
  constructor (options) {
    // 获取元素dom对象
    this.$el = document.querySelector(options.el)

    // 转存数据
    this.$data = options.data || {}

    //数据代理
    this._proxyData(this.$data)

    //函数的代理
    this._proxyMethods(options.methods)

    //数据劫持
    new Observer(this.$data)

    //编译模版
    new Compiler(this)
  }
  _proxyData (data) {
    Object.keys(data).forEach(key => {
      Reflect.defineProperty(this, key, {
        set (newValue) {
          data[key] = newValue
        },
        get () {
          return data[key]
        }
      })
    })
  }
  _proxyMethods (methods) {
    if (methods && typeof methods === 'object') {
      Object.keys(methods).forEach(key => {
        this[key] = methods[key]
      })
    }
  }
}
window.Vue = Vue