export const mergeMaps = (...maps) => {
  const map = new Map()

  maps.forEach((m) => {
    m.forEach((value, key) => {
      map.set(key, value)
    })
  })
  return map
}
