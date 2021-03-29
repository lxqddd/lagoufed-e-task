/*
 * @Author       : your name
 * @Date         : 2021-03-27 15:04:35
 * @LastEditTime : 2021-03-29 22:27:08
 * @LastEditors  : Please set LastEditors
 * @Description  : In User Settings Edit
 * @FilePath     : \lagoufed-e-task\myPromise.js
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(execFn) {
    try {
      execFn(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  status = PENDING
  value = null
  reason = null
  successCallback = []
  failCallback = []

  resolve = value => {
    if (this.status !== PENDING) {
      return
    }
    this.status = FULFILLED
    this.value = value
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }

  reject = reason => {
    if (this.status !== PENDING) {
      return
    }
    this.status = REJECTED
    this.reason = reason

    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }

  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback
      ? failCallback
      : reason => {
          throw reason
        }
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const result = successCallback(this.value)
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
    return this.then(undefined, failCallback)
  }

  static all(array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData(index, data) {
        result[index] = data
        index++
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
      return value
    } else {
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
