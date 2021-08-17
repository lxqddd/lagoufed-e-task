// const lengthOfLongestSubstring = function (s) {
//   let map = new Map()
//   let i = -1
//   let res = 0
//   let n = s.length
//   for (let j = 0; j < n; j++) {
//     if (map.has(s[j])) {
//       i = Math.max(i, map.get(s[j]))
//     }
//     res = Math.max(res, j - i)
//     map.set(s[j], j)
//   }
//   return res
// }

const lengthOfLongestSubstring = str => {
  let tempArr = []
  for (let i = 0; i < str.length; i++) {
    tempArr.push(str[i])
  }
  let retArr = new Set(tempArr)
  return retArr.size
}

console.log(lengthOfLongestSubstring('asdafasfassfd'))
