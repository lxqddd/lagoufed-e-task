// 函数柯里化

function add(...args) {
  return args.reduce((a, b) => a + b)
}

function currying(fn) {
  // 其实就是收集所有的参数
  let args = []
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs]
      return temp
    } else {
      // 所有最后一次没有传参数，代表要调用该函数了
      let val = fn.apply(this, args)
      args = []
      return val
    }
  }
}

const addCurry = currying(add)

console.log(addCurry(1)(2)(3)(4)(5)())

const person = [{ name: 'kevin' }, { name: 'daisy' }]

const prop = currying(function (key, obj) {
  return obj[key]
})

const names = person.map(prop('name')())
console.log(names)
