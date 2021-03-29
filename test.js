/*
 * @Author       : your name
 * @Date         : 2021-03-14 22:25:47
 * @LastEditTime : 2021-03-29 22:23:46
 * @LastEditors  : Please set LastEditors
 * @Description  : In User Settings Edit
 * @FilePath     : \lagoufed-e-task\test.js
 */
const MyPromise = require('./myPromise.js')

const promise = new MyPromise((resolved, rejected) => {
  // throw new Error('执行器错误')
  setTimeout(() => {
    resolved('success')
  }, 0)
  // rejected('fail')
})

function other() {
  return new MyPromise((resolve, reject) => {
    resolve('other')
  })
}

// const p1 = promise.then(value => {
//   console.log(value)
//   return p1
// })
// p1.then(
//   value => {
//     console.log(value)
//   },
//   reason => {
//     console.log(reason.message)
//   }
// )

// promise
// .then(value => {
//   console.log(value)
//   // throw new Error('resolve cuowu ')
//   return 100
// })
// .then()
// .then(
//   value => {
//     console.log('hello world')
//     console.log(value)
//   },
//   reason => {
//     console.log(reason)
//   }
// )
// promise.then(
//   value => {
//     console.log(value)
//   },
//   reason => {
//     console.log(reason)
//   }
// )

// MyPromise.resolve(promise).then(value => console.log(value))

function p2() {
  return new MyPromise((resolve, reject) => {
    resolve('p2')
  })
}

p2()
  .finally(() => {
    console.log('hello')
    return other()
  })
  .then(value => {
    console.log(value)
  })
