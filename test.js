function compose(fn1, fn2) {
  return function (value) {
    return fn1(fn2(value))
  }
}

const arr = [1, 3, 4, 5, 6]

function reverse(array) {
  return array.reverse()
}

function getFirst(array) {
  return array[0] ? array[0] : null
}

const composeFn = compose(getFirst, reverse)
console.log(composeFn(arr))
