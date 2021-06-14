import { h } from 'snabbdom/build/h.js'
import { init } from 'snabbdom/build/init.js'

const patch = init([])

let vNode = h('ul#wrap.list', [
  h('li.item', 'hello list1'),
  h('li.item', 'hello list2'),
  h('li.item', 'hello list3')
])

const app = document.querySelector('#app')

let oldVnode = patch(app, vNode)

console.log('hello world')
