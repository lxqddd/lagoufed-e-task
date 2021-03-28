/*
 * @Author       : your name
 * @Date         : 2021-03-27 15:04:35
 * @LastEditTime : 2021-03-28 17:30:30
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
