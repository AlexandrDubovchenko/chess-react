import { Bishop } from "../figures/Bishop"
import { King } from "../figures/King"
import { Knight } from "../figures/Knight"
import { Pawn } from "../figures/Pawn"
import { Queen } from "../figures/Queen"
import { Rook } from "../figures/Rook"

const figureRow = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

export const teams = {
  white: [],
  black: []
}

export const getInitialGameState = () => {
  const state = {}

  for (let i = 0; i < figureRow.length; i++) {
    const blackFigure = new figureRow[i]({
      color: "black",
      position: {
        row: 0,
        pos: i
      }
    })

    teams.black.push(blackFigure)
    state["0" + i] = blackFigure

    const whiteFigure = new figureRow[i]({
      color: "white",
      position: {
        row: 7,
        pos: i
      }
    })

    teams.black.push(whiteFigure)

    state["7" + i] = whiteFigure
  }

  for (let i = 0; i < figureRow.length; i++) {
    const blackPawn = new Pawn({
      color: "black",
      position: {
        row: 1,
        pos: i
      }
    })

    const whitePawn = new Pawn({
      color: "white",
      position: {
        row: 6,
        pos: i
      }
    })

    teams.black.push(blackPawn)
    teams.white.push(whitePawn)

    state["1" + i] = blackPawn

    state["6" + i] = whitePawn
  }

  return state
}
