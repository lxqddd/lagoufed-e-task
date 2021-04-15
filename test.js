var a = 10
var obj = {
  a: 20,
  fn() {
    console.log(this)
    setTimeout(() => {
      console.log(this.a)
    })
  }
}
obj.fn()
