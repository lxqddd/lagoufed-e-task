class Vue {
  constructor(options) {
    // 通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

    // 把data中的成员转换成getter和setter，注入到vue实例中
    this._proxyData(this.$data)

    // 将事件监听函数注入到vue实例中
    this._mapMethods(this.$options.methods || {})

    // 调用observer对象，监听数据变化
    new Observer(this.$data)

    // 调用compiler对象，处理指令和插值表达式
    new Compiler(this)
  }

  _proxyData(data) {
    // 遍历data中的所有属性
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (data[key] === newValue) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
  _mapMethods(methods) {
    const keys = Object.keys(methods)

    keys.forEach(key => {
      this[key] = methods[key]
    })
  }
}
