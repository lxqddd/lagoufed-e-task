// setTimeout(() => {
//   var a = 'hello'
//   setTimeout(() => {
//     var b = 'lagou'
//     setTimeout(() => {
//       var c = 'I ❤ U'
//       console.log(a + b + c)
//     }, 10)
//   }, 10)
// }, 10)

function fn(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value)
    })
  })
}
fn()
  .then(() => {
    return fn('hello')
  })
  .then(value => {
    return fn(value + 'lagou')
  })
  .then(value => {
    return fn(value + 'I ❤ U')
  })
  .then(value => {
    console.log(value)
  })
