export default class Observer {
  constructor (data) {
    // console.log('=>data', data)
    this.data = data
    this.walk(this.data)
  }

  walk (data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive (data, key, val) {
    Reflect.defineProperty(data, key, {
      configurable: false,
      enumerable: true,
      get () {
        console.log('=>get', val)
        return val
      },
      set (newValue) {
        val = newValue
        console.log('=>set', newValue)
      }
    })
    this.walk(key)
  }
}