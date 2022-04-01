import { checkCell } from "../utils/checkCell";
import { Figure } from "./Figure";
import { Game } from "./Game";

export class King extends Figure {
  name = 'king'
  game

  constructor(params) {
    super(params)
    this.game = new Game()
  }

  calculateAvailablePositions(gameState) {
    const result = {}

    const { row, pos } = this.position

    const enemyColor = this.color === 'white' ? 'black' : 'white'

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!j && !i) {
          continue
        }
        const id = `${row + i}${pos + j}`
        if (checkCell(id, gameState, this)) {
          result[id] = {}
          if (gameState[id]) {
            continue
          }
        } else {
          continue
        }
      }

    }

    if (!this.isTouched) {
      const rooksPos = [`${row}0`, `${row}7`]
      let canLongCastling
      let canShortCastling

      for (let i = 1; i < 4; i++) {
        if (!gameState[`${row}${i}`] && !gameState[rooksPos[0]]?.isTouched) {
          canLongCastling = true
        } else {
          canLongCastling = false
          break
        }

        if (i > 1 && this.game.checkIsCellAttacked(`${row}${i}`, enemyColor)) {
          canLongCastling = false
          break
        }
      }

      for (let i = 5; i < 7; i++) {
        if (!gameState[`${row}${i}`] && !gameState[rooksPos[1]]?.isTouched && !this.game.checkIsCellAttacked(`${row}${i}`, enemyColor)) {
          canShortCastling = true
        } else {
          canShortCastling = false
          break
        }
      }

      if (canShortCastling) {
        const id = `${row}${pos + 2}`
        result[id] = { isCastling: true, rookPosition: rooksPos[1], castlingType: 'short' }
      }
      if (canLongCastling) {
        const id = `${row}${pos - 2}`
        result[id] = { isCastling: true, rookPosition: rooksPos[0], castlingType: 'long' }
      }
    }

    return result
  }
}
