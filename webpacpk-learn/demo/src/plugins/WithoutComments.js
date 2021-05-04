class WithoutComments {
  apply(compiler) {
    compiler.hooks.emit.tap('WithoutComments', compilation => {
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const result = contents.replace(/\/\*\*+\*\//g, '')
          compilation.assets[name] = {
            source: () => {
              return result
            },
            size: () => {
              return result.size
            }
          }
        }
      }
    })
  }
}

module.exports = WithoutComments
