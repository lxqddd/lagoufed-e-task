// function creatArray<T>(length: number, value: T): T[] {
//   const arr = Array<T>(length).fill(value)
//   return arr
// }

// console.log(creatArray<string>(2, 'hello world'))

function task<T>(arr: T[], num: number): T[] {
  if (arr.length < num) {
    return arr
  }
  const newArr: T[] = []
  for (let i = 0; i < num; i++) {
    newArr.push(arr[i])
  }
  return newArr
}

const newArr = task<number>([1, 2, 3, 4], 2)
console.log(newArr)

type callback<T> = (n: T, i: number) => boolean
