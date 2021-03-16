/*
 * @Author       : your name
 * @Date         : 2021-03-14 22:25:47
 * @LastEditTime : 2021-03-16 21:44:16
 * @LastEditors  : Please set LastEditors
 * @Description  : In User Settings Edit
 * @FilePath     : \lagoufed-e-task\test.js
 */
function checkAge(min) {
  return function (age) {
    return age > min
  }
}

const checkAge18 = checkAge(18)
console.log(checkAge18(22))
console.log(checkAge18(16))
console.log(checkAge18(24))
