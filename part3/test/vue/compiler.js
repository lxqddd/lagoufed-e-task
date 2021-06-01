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
    console.log(node)
  }

  // 编译文本节点，处理插值表达式
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      const key = RegExp.$1.trim()
      console.log(key)
      node.textContent = value.replace(reg, this.vm[key])
    }
  }

  // 判断元素属性是否是指令
  isDirection(attrName) {
    return attrName.startsWith('v-')
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
