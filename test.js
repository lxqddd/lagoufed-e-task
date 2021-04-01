const obj = {
  name: '夜殇',
  age: 18
}

const objProxy = new Proxy(obj, {
  get(target, prop) {
    // console.log(target, prop)
    return target[prop] ? target[prop] : '夜殇最帅'
  },
  set(target, prop, newValue) {
    // console.log(target, prop, newValue)
    if (prop === 'age') {
      target[prop] = newValue > 18 ? 18 : newValue
      return
    }
    target[prop] = newValue
  },
  deleteProperty(target, prop) {
    if (prop === 'name') {
      console.log('你丫敢删我试试！！')
      return
    }
    delete target[prop]
  }
})

console.log(objProxy.name)
objProxy.age = 17
console.log(objProxy.age)
delete objProxy.name
delete objProxy.age
console.log(obj)
