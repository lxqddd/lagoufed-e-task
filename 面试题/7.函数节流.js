function throttle(fn, wait) {
  let timer
  return function proxy() {
    let self = this
    let args = arguments
    if (timer) {
      return
    }
    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      fn.call(self, ...args)
    }, wait)
  }
}
