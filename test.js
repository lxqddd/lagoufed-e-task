const name = '夜殇'
const age = 18

function test(string, name, age) {
  console.log(string)
  console.log(arguments)
  return string[0] + name + string[1] + (age > 18 ? 18 : age) + string[2]
}

const str = test`hello ${name}, ${age} years old.`

console.log(str)
