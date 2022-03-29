export const checkCell = (id, gameState, figure) => {
  if (!gameState[id]) {
    return true
  } else if (gameState[id]?.color !== figure.color) {
    return true
  } else {
    return false
  }
}
