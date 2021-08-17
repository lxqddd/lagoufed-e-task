// function fabonacci(n) {
//   let num1 = 1,
//     num2 = 1,
//     sum
//   let arr = [1, 1]
//   for (let i = 3; i <= n; i++) {
//     sum = num1 + num2
//     num1 = num2
//     num2 = sum
//     arr.push(sum)
//   }
//   return arr
// }

function fabonacci(n) {
  if (!n) {
    throw new Error(`${n} is not be allow`)
  }
  let arr
  if (n === 1) {
    arr = [0]
    return arr
  }
  if (n === 2) {
    arr = [0, 1]
    return arr
  }
  let num1 = 1
  let num2 = 1
  let sum
  arr = [0, 1, 1]
  for (let i = 3; i < n; i++) {
    sum = num1 + num2
    num1 = num2
    num2 = sum
    arr.push(sum)
  }
  return arr
}

console.log(fabonacci(10))
