class Event {
  constructor() {
    this.events = {}
  }
  // 发布事件
  $on(eventName, fn) {
    if (eventName && fn) {
      this.events[eventName] = this.events[eventName] ? this.events[eventName].push(fn) : [fn]
    }
  }

  // 订阅事件
  $emit(eventName) {
    this.events[eventName].forEach(event => event())
  }
}

const event = new Event()
event.$on('click', () => {
  console.log('click')
})

event.$emit('click')
