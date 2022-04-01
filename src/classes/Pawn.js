import { Figure } from "./Figure";

export class Pawn extends Figure {
  name = 'pawn'

  calculateAvailablePositions(gameState) {
    const cells = []
    const { row, pos } = this.position
    let possibleId
    const direction = this.color === "white" ? - 1 : 1
    const nextRow = row + direction


    for (let i = -1; i <= 1; i++) {
      possibleId = `${nextRow}${pos + i}`
      if (gameState[possibleId] && i && gameState[possibleId]?.color !== this.color) {
        cells.push(possibleId)
      } else if (!gameState[possibleId] && !i) {
        cells.push(possibleId)
      }
    }

    if (!this.isTouched) {
      const nextRow = row + 2 * direction
      possibleId = `${nextRow}${pos}`
      if (!gameState[possibleId]) {
        cells.push(possibleId)
      }
    }

    return cells.reduce((acc, el) => ({ ...acc, [el]: {} }), {})
  }
}
