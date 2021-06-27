import MyMap from './Map/index'

const myMap = new MyMap()

myMap.set(1, 2)
const ret: number = myMap.get(1)

console.log(typeof ret)
