class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    // 1. 判断data是否是对象
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, value) {
    // 将data中的对象中的属性转换成响应式的
    this.walk(value)
    const self = this
    // 负责收集依赖，并发送通知
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        if (value === newValue) {
          return
        }
        value = newValue
        // 将重新赋值的对象转换成响应式的
        self.walk(value)
        // 发送通知
        dep.notify()
      }
    })
  }
}
