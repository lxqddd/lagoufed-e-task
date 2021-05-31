class Dep {
  constructor() {
    // 收集所有的订阅者
    this.subs = []
  }
  addSub(sub) {
    // 添加订阅者
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 发布通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

class Watcher {
  update() {
    console.log('update')
  }
}

const dep = new Dep()
const watcher = new Watcher()

dep.addSub(watcher)
dep.notify()
