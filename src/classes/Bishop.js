import { checkCell } from "../utils/checkCell";
import { Figure } from "./Figure";

export class Bishop extends Figure {
  name = 'bishop'

  calculateAvaliablePositions(gameState) {
    const result = {}
    const { row, pos } = this.position
    let curRow = row + 1;
    let curPos = pos + 1

    while (curPos < 8 && curRow < 8) {
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
      curPos++
    }

    curRow = row - 1
    curPos = pos - 1


    while (curRow >= 0 && curPos >= 0) {
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
      curPos--
    }
    curRow = row - 1
    curPos = pos + 1

    while (curRow >= 0 && curPos < 8) {
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
      curPos++
    }

    curRow = row + 1
    curPos = pos - 1

    while (curRow < 8 && curPos >= 0) {
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
      curPos--
    }

    return result
  }
}
