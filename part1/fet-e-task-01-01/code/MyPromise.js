const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(execFn) {
    try {
      // 捕获启动器函数的异常
      // promise中传入的启动器函数
      execFn(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  // 定义promise的初始状态
  status = PENDING
  // 用于保存promise成功的值
  value = null
  // 用于保存promise失败的原因
  reason = null
  // 用于保存因多次调用产生的成功的函数
  successCallback = []
  // 用于保存失败的函数
  failCallback = []

  // 成功的回调函数
  resolve = value => {
    // 如果当前promise的状态是等待状态，则继续向下执行，如果状态不是等待，说明该promise已经执行过，状态已经被修改
    if (this.status !== PENDING) {
      return
    }
    // 修改当前promise的状态为成功
    this.status = FULFILLED
    // 存储当前promise值
    this.value = value
    // 判断成功的回调是否存在，如果存在则依次调用
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }

  // 失败的回调函数
  reject = reason => {
    // 如果当前promise的状态是等待状态，则继续向下执行，如果状态不是等待，说明该promise已经执行过，状态已经被修改
    if (this.status !== PENDING) {
      return
    }
    // 将当前的状态修改为失败
    this.status = REJECTED
    // 保存失败的原因
    this.reason = reason
    // 判断失败的回调是否存在，如果存在则一次调用
    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }

  // promise的then方法
  then(successCallback, failCallback) {
    // 判断当前成功的回调是否存在，如果不存在则补一个函数，直接返回上一个promise的返回值
    successCallback = successCallback ? successCallback : value => value
    // 判断当前失败的回调是否存在，如果不存在则补一个函数，返回失败的原因
    failCallback = failCallback
      ? failCallback
      : reason => {
          throw reason
        }
    // promise中的then方法返回的是一个promise对象
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // 捕获异常
            const result = successCallback(this.value)
            // 需要判断result的值是普通值还是promise对象，如果是普通值，直接调用resolve
            resolvePromise(promise, result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const result = failCallback(this.reason)
            resolvePromise(promise, result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        // 状态为等待的时候，将成功和失败的回调保存起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              const result = successCallback(this.value)
              resolvePromise(promise, result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              const result = failCallback(this.reason)
              resolvePromise(promise, result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise
  }

  finally(callback) {
    return this.then(
      value => {
        return MyPromise.resolve(callback()).then(val => {
          return val
        })
      },
      reason => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  cache(failCallback) {
    // 捕获异常
    return this.then(undefined, failCallback)
  }

  static all(array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData(index, data) {
        result[index] = data
        index++
        // 当index和数组长度相等时才判定为执行结束
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          // 值是promise 对象
          current.then(
            value => addData(i, value),
            reason => reject(reason)
          )
        } else {
          // 值是普通类型
          addData(i, current)
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      // 值是promise对象
      return value
    } else {
      // 值是普通类型
      return new MyPromise((resolve, reject) => {
        resolve(value)
      })
    }
  }
}

function resolvePromise(promise, result, resolve, reject) {
  if (promise === result) {
    return reject(new Error('promise 被循环调用了'))
  }
  if (result instanceof MyPromise) {
    result.then(
      value => resolve(value),
      reason => {
        reject(reason)
      }
    )
  } else {
    resolve(result)
  }
}

module.exports = MyPromise
