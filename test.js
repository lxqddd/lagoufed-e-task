/*
 * @Author       : your name
 * @Date         : 2021-03-14 22:25:47
 * @LastEditTime : 2021-03-16 22:35:40
 * @LastEditors  : Please set LastEditors
 * @Description  : In User Settings Edit
 * @FilePath     : \lagoufed-e-task\test.js
 */
function curry(fn) {
  console.log(fn.length)
  return function curryFn(...args) {
    // args.length: 实参的个数
    // fn.length: 形参的个数
    if (args.length < fn.length) {
      return function () {
        return curryFn(...args.concat(Array.from(arguments)))
      }
    }
    return fn(...args)
  }
}

const currySum = curry((num1, num2, num3) => num1 + num2 + num3)
console.log(currySum(1, 2, 3))
console.log(currySum(1)(2)(3))
