class MyMap {
  constructor(items) {
    this.items = items
    this.allKeys = []
    this.allValues = []
    this.items && this.#init()
  }
  #init() {
    this.items.forEach(item => {
      this.set(item[0], item[1])
    })
  }

  has(key) {
    return this.allKeys.includes(key)
  }

  #getKeyIndex(key) {
    return this.allKeys.indexOf(key)
  }

  set(key, value) {
    if (this.has(key)) {
      this.allValues[this.#getKeyIndex(key)] = value
      return
    }
    this.allKeys.push(key)
    this.allValues.push(value)
  }

  get(key) {
    if (!this.has(key)) {
      throw new Error(`can't find ${key} in Map`)
    }
    return this.allValues[this.#getKeyIndex(key)]
  }

  delete(key) {
    if (!this.has(key)) {
      throw new Error(`can't find ${key} in Map, because of I can't find it!`)
    }
    this.allKeys.splice(this.#getKeyIndex(key), 1)
    this.allValues.splice(this.#getKeyIndex(key), 1)
    return true
  }

  clear() {
    this.allKeys = []
    this.allValues = []
    return true
  }

  keys() {
    return this.allKeys
  }

  values() {
    return this.allValues
  }

  forEach(callback) {
    this.allKeys.forEach((item, index) => {
      callback([item, this.allValues[index]], index)
    })
  }

  size() {
    return this.allKeys.length
  }

  entries() {
    const ret = []
    this.allKeys.forEach((item, index) => {
      ret.push([item, this.allValues[index]])
    })
    return ret
  }
}

const map = new MyMap([
  [1, 2],
  [5, 6],
  [5, 0]
])

map.set(2, 'a')

// map.delete(2)
console.log(map.entries())

// map.forEach(item => {
//   console.log(item[0], item[1])
// })
