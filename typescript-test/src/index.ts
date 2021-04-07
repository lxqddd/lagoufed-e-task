const h: string = 'hello'

console.log(h)

const arr: number[] = [1, 3]

function sum(...arg: Array<number>): number {
  return arg.reduce((prev, cur) => prev + cur, 0)
}

console.log(sum(1, 2, 3, 4))
console.log('hello world')
