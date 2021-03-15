function once(fn) {
  let done = false
  return function () {
    if (!done) {
      done = true
      return fn.apply(this, arguments)
    }
  }
}

const pay = once(money => {
  console.log(`支付了${money}元`)
})
pay(5)
pay(5)
pay(5)
pay(5)
pay(5)
