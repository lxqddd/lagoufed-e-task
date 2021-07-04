import MyMap from './Map/index'

const myMap = new MyMap()

myMap.set(1, 2)

const add = (num1: number, num2: number): number => {
  return num1 + num2
}

const obj = {
  name: '夜殇',
  age: '18'
}
const obj2 = {
  name: '夜殇',
  age: '18'
}

myMap.set(add, obj)
myMap.set(obj, 3)
myMap.set(3, obj)
myMap.set(obj, add)

// myMap.clear()

// myMap.delete(3)
// myMap.delete(obj)

const fn = (num1: number, num2: number): number => {
  return num1 + num2
}
console.log(Object.is(add, fn))
console.log(myMap.has(obj2))
console.log(myMap.size())
console.log(myMap.mapKeyIndex(3))
console.log(myMap.keys())
console.log(myMap.values())
myMap.delete(3)
console.log(myMap.get(obj))
// console.log(myMap.map())

// console.log(myMap.get(1))
// console.log(myMap.get(add))
// console.log(myMap.get(obj))
// myMap.forEach((item, index, myMap) => {
//   console.log(item)
//   // console.log(index)
//   // console.log(myMap)
// })
