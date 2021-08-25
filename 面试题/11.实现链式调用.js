// 构造函数原型

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.methods = function (params) {
  console.log(params)
  return this
}

// 对象实现

const obj = {
  foo() {
    console.log('hello')
    return this
  },
  bar() {
    console.log('world')
    return this
  }
}

obj.foo().bar()

// 类实现

class MyMath {
  constructor(value) {
    this.value = value
  }

  parseIntVal() {
    if (typeof this.value !== 'number') {
      console.log(parseInt(this.value))
    } else {
      console.log(this.value)
    }
    return new MyMath(this.value)
  }
}

const myMath = new MyMath('1234')

myMath.parseIntVal().parseIntVal()
