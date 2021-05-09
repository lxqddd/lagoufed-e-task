const fs = require('fs')

fs.open('./foo.js', 'r', 0o666, (err, res) => {
  console.log(res)
})
