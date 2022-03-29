import { checkCell } from "../utils/checkCell";
import { Figure } from "./Figure";

export class Rook extends Figure {
  name = 'rook'

  calculateAvaliablePositions(gameState) {
    const result = {}
    const { row, pos } = this.position
    let curRow = row + 1;
    let curPos = pos

    while (curRow < 8) {
      const id = `${curRow}${curPos}`
      if (checkCell(id, gameState, this)) {
        result[id] = true
        if (gameState[id]) {
          break
        }
      } else {
        break
      }
      curRow++
    }

    curRow = row - 1
    curPos = pos;


    while (curRow >= 0) {
      const id = `${curRow}${curPos}`
      if (checkCell(id, gameState, this)) {
        result[id] = true
        if (gameState[id]) {
          break
        }
      } else {
        break
      }
      curRow--
    }

    curRow = row
    curPos = pos + 1

    while (curPos < 8) {
      const id = `${curRow}${curPos}`
      if (checkCell(id, gameState, this)) {
        result[id] = true
        if (gameState[id]) {
          break
        }
      } else {
        break
      }
      curPos++
    }

    curRow = row
    curPos = pos - 1

    while (curPos >= 0) {
      const id = `${curRow}${curPos}`
      if (checkCell(id, gameState, this)) {
        result[id] = true
        if (gameState[id]) {
          break
        }
      } else {
        break
      }
      curPos--
    }

    return result
  }
}
