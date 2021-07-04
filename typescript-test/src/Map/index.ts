class MyMap {
  private mapKeys: any[] = []
  private mapValues: any[] = []

  get(key: any): any {
    if (this.has(key)) {
      return this.mapValues[this.mapKeyIndex(key)]
    }
    return new Error(`can't find ${key}'s value in this map`)
  }

  // 判断当前map中是否有目标键值对，如果有，则更新，没有则创建
  set(key: any, value: any): boolean {
    if (!this.has(key)) {
      this.mapKeys.push(key)
      this.mapValues.push(value)
    }
    this.mapValues[this.mapKeyIndex(key)] = value
    return true
  }

  // 删除指定的键值
  delete(key: any) {
    const index = this.mapKeys.indexOf(key)
    if (index < 0) {
      return new Error(`can't find value of ${key}`)
    }
    this.mapKeys.splice(index, 1)
    this.mapKeys.splice(index, 1)
    return true
  }

  // 返回当前map中的所有key值
  keys(): any[] {
    return this.mapKeys
  }

  // 返回当前map中的所有value值
  values(): any[] {
    return this.mapValues
  }

  // 返回map的长度
  size(): number {
    return this.mapKeys.length
  }

  // 清空当前的map
  clear(): boolean {
    this.mapKeys = []
    this.mapValues = []
    return true
  }

  // 遍历当前的map
  forEach(callback: (item: any[], index: number, map: any[]) => void) {
    this.map().forEach((item, index, map) => {
      callback(item, index, map)
    })
  }

  map(): any[] {
    const map: any[] = []
    this.mapKeys.forEach((item, index) => {
      map.push([item, this.mapValues[index]])
    })
    return map
  }

  // 判断当前map中是否包含目标键的值
  has<T>(key: T): boolean {
    const index = this.mapKeys.indexOf(key)
    return index > -1
  }

  mapKeyIndex<T>(key: T): number {
    return this.mapKeys.indexOf(key)
  }

  isEqual<K, V>(obj1: K, obj2: V): boolean {
    return Object.is(obj1, obj2)
  }
}

export default MyMap
