/*
 * @Author       : your name
 * @Date         : 2021-03-14 22:25:47
 * @LastEditTime : 2021-03-28 17:31:59
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

promise
  .then(value => {
    console.log(value)
    // throw new Error('resolve cuowu ')
    return 100
  })
  .then(
    value => {
      console.log('hello world')
      console.log(value)
    },
    reason => {
      console.log(reason)
    }
  )
// promise.then(
//   value => {
//     console.log(value)
//   },
//   reason => {
//     console.log(reason)
//   }
// )
