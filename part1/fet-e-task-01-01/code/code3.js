const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])

// 1.
let ex1 = num => {
  let fn = fp.flowRight(fp.map(fp.add(num)))
  return maybe.map(fn)
}
console.log(ex1(1))

// 2.
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
  return xs.map(fp.first)._value
}
console.log(ex2())

// 3.
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
  return safeProp('name', user).map(fp.first)._value
}
console.log(ex3())

// 4.
let ex4 = function (n) {
  return new Maybe(n).map(parseInt)._value
}
console.log(ex4('11'))
