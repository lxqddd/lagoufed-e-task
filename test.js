// Reflect 提供了一整套操作对象的方法，让我们操作对象的时候更加规范
const obj = {
  name: null,
  age: 18
}

// 判断当前对象中是否有要找的属性
console.log(Reflect.has(obj, 'name'))

// 删除对象上的某个属性
Reflect.deleteProperty(obj, 'name')

// 获取当前对象的所有键
console.log(Reflect.ownKeys(obj))

console.log(Reflect.getOwnPropertyDescriptor(obj, 'age'))

console.log(obj)
