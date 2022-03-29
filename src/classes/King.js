import { checkCell } from "../utils/checkCell";
import { Figure } from "./Figure";

export class King extends Figure {
  name = 'king'

  calculateAvaliablePositions(gameState) {
    const result = {}

    const { row, pos } = this.position

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!j && !i) {
          continue
        }
        const id = `${row + i}${pos + j}`
        if (checkCell(id, gameState, this)) {
          result[id] = true
          if (gameState[id]) {
            continue
          }
        } else {
          continue
        }
      }

    }

    return result
  }
}
