function memoize(fn) {
  const cache = {}
  return function () {
    let key = JSON.stringify(arguments)
    cache[key] = cache[key] || fn.apply(fn, arguments)
    return cache[key]
  }
}

let getArea = r => {
  console.log('hello world')
  return Math.PI * r * r
}

let test = memoize(getArea)
console.log(test(4))
console.log(test(4))
console.log(test(4))
console.log(test(4))
