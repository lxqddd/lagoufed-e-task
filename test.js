// 每一个symbol类型的值都是唯一的，创建的时候允许传入一个字符串表示对这个值的而描述
const s = Symbol('this is a test')
console.log(s)

// 该类型可以实现对象的私有成员

// 例如：在 a.js 中创建一个创建一个类
// const
class Person {
  _name = Symbol('this is name')
  constructor(name, age) {
    this[this._name] = name
    console.log(this[this._name])
  }
  sayName() {
    console.log(`my name is ${this[this._name]}`)
  }
}

const person = new Person('yeshang')
person.sayName()

// 这个时候在另一个 b.js 文件中是无法创建一个相同的_name的，因此也就无法访问到_name
