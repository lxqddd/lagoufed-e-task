class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayHi() {
    console.log(`hello world, my name is ${this.name}`)
  }
}

const person = new Person('夜殇', 18)
person.sayHi()

class Student extends Person {
  constructor(name) {
    super(name)
  }
}

const student = new Student('yeshang')
student.sayHi()
