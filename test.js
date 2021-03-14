function map(array, fn) {
  let results = []
  for (let index = 0; index < array.length; index++) {
    results.push(fn(array[index], index, array))
  }
  return results
}

const arr = [1, 2, 3, 4, 5]
const ret = map(arr, (item, index, array) => {
  return item + 1
})
console.log(ret)
