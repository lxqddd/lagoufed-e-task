// function merge(arr1, arr2) {
//   var result = []
//   while (arr1.length > 0 && arr2.length > 0) {
//     if (arr1[0] < arr2[0]) {
//       /*shift()⽅法⽤于把数组的第⼀个元素从其中删除，并返回第⼀个元素的值。*/
//       result.push(arr1.shift())
//     } else {
//       result.push(arr2.shift())
//     }
//   }
//   return result.concat(arr1).concat(arr2)
// }
// function mergeSort(arr) {
//   let lengthArr = arr.length
//   if (lengthArr === 0) {
//     return []
//   }
//   while (arr.length > 1) {
//     let arrayItem1 = arr.shift()
//     let arrayItem2 = arr.shift()
//     let mergeArr = merge(arrayItem1, arrayItem2)
//     arr.push(mergeArr)
//   }
//   return arr[0]
// }
let arr1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 2, 3],
  [4, 5, 6]
]
let arr2 = [
  [1, 4, 6],
  [7, 8, 10],
  [2, 6, 9],
  [3, 7, 13],
  [1, 5, 12]
]

function mergeSort(arr) {
  let temp = []
  arr.forEach(item => {
    temp = [...temp, ...item]
  })
  temp.sort((a, b) => a - b)
  return temp
}
console.log(mergeSort(arr1))
console.log(mergeSort(arr2))
