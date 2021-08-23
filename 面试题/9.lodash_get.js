function get(obj, path, defaultValue) {
  const paths = path.split('[').join('.').split(']').join('').split('.')
  let result = obj
  for (const path of paths) {
    result = Object(result)[path]
    if (result === undefined) return defaultValue
  }
  return result
}

let obj = {
  name: 'foo',
  age: 20,
  friend: {
    name: 'aa',
    age: 18
  }
}

console.log(get(obj, 'friend[name]'))
