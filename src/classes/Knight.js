import { Figure } from "./Figure";

export class Knight extends Figure {
  name = 'knight'

  calculateAvaliablePositions(gameState) {
    const maxSteps = 3
    const result = {}
    const { row, pos } = this.position
    for (let i = -2; i <= 2; i++) {
      if (!i) {
        continue
      }
      const stepsLeft = maxSteps - Math.abs(i)
      const possibleLeftId = `${row + i}${pos - stepsLeft}`
      const possibleRightId = `${row + i}${pos + stepsLeft}`
      if (!(gameState[possibleLeftId]?.color === this.color)) {
        result[possibleLeftId] = true
      }
      if (!(gameState[possibleRightId]?.color === this.color)) {
        result[possibleRightId] = true
      }
    }

    return result
  }
}
