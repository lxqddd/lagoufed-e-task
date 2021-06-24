class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模板，处理文本节点和元素节点
  compile(el) {
    const elChildren = el.childNodes
    Array.from(elChildren).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }

      // 如果当前节点含有子节点，则执行递归
      if (this.hasChildrenNode(node)) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点，处理指令
  compileElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirection(attrName)) {
        // console.log(attrName.indexOf(':'))
        let eventName = ''
        // console.log(attrName)
        if (attrName.indexOf(':') >= 0) {
          const colonIndex = attrName.indexOf(':')
          eventName = attrName.substring(colonIndex + 1)
        } else if (attrName.indexOf('@') >= 0) {
          const colonIndex = attrName.indexOf('@')
          eventName = attrName.substring(colonIndex + 1)
        } else {
          eventName = attrName.substring(2)
        }
        let key = attr.value
        // console.log(eventName)
        this.update(node, key, attrName, eventName)
      }
    })
  }

  isEvent(attrName) {
    return attrName.indexOf(':') > -1 || attrName.indexOf('@') > -1
  }

  update(node, key, attrName, eventName) {
    let updateFn = null
    if (this.isEvent(attrName)) {
      updateFn = this.onUpdater
    } else {
      updateFn = this[eventName + 'Updater']
    }
    updateFn && updateFn.call(this, node, this.vm[key], key, eventName)
  }

  // 编译文本节点，处理插值表达式
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      const key = RegExp.$1.trim()
      // console.log(key)
      node.textContent = value.replace(reg, this.vm[key])
    }
  }

  // 处理v-text
  textUpdater(node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, newValue => {
      // console.log(newValue)
      node.textContent = newValue
    })
  }

  // v-model
  modelUpdater(node, value, key) {
    node.value = value
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
      // console.log(this.vm[key])
    })
  }

  // 处理 v-on 指令
  onUpdater(node, value, key, eventName) {
    console.log(eventName)
    console.log(this.vm[key])
    node.addEventListener(eventName, this.vm[key].bind(this.vm))
  }

  // 判断元素属性是否是指令
  isDirection(attrName) {
    return attrName.startsWith('v-') || attrName.startsWith('@')
  }

  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 判断当前节点是否有子节点
  hasChildrenNode(node) {
    return node.childNodes && node.childNodes.length > 0
  }
}
