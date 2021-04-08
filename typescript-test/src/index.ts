function creatArray<T>(length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

console.log(creatArray<string>(2, 'hello world'))
