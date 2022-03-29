import { Bishop } from "./Bishop"
import { King } from "./King"
import { Queen } from "./Queen"
import { Rook } from "./Rook"
import { Knight } from "./Knight"
import { Pawn } from "./Pawn"
import { mergeMaps } from "../utils/mergeMap"

const figureRow = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

export class Game {
  teams = {
    white: [],
    black: []
  }

  initialGameState = null

  constructor() {
    if (!this.initialGameState) {
      this.initialGameState = this.initializeGame()
    }
    if (typeof Game.instance === 'object') {
      return Game.instance
    }
    Game.instance = this
    return Game.instance
  }

  initializeGame() {
    const state = {}

    for (let i = 0; i < figureRow.length; i++) {
      const blackFigure = new figureRow[i]({
        color: "black",
        position: {
          row: 0,
          pos: i
        }
      })

      this.teams.black.push(blackFigure)
      state["0" + i] = blackFigure

      const whiteFigure = new figureRow[i]({
        color: "white",
        position: {
          row: 7,
          pos: i
        }
      })

      this.teams.white.push(whiteFigure)

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

      this.teams.black.push(blackPawn)
      this.teams.white.push(whitePawn)

      state["1" + i] = blackPawn

      state["6" + i] = whitePawn
    }

    return state
  }

  removeFigure(figure) {
    const index = this.teams[figure.color].indexOf(figure)
    this.teams[figure.color].splice(index, 1)
  }

  calculateAvaliableCellsForTeam(gameState, team) {
    const positions = new Map()
    this.teams[team].forEach((f) => {
      const result = f.calculateAvaliablePositions(gameState)
      positions.set(f, result)
    })
    return positions
  }

  calculateAvaliableCellsForAllFigures(gameState) {

    const whitePositions = this.calculateAvaliableCellsForTeam(gameState, 'white')
    const blackPositions = this.calculateAvaliableCellsForTeam(gameState, 'black')

    return mergeMaps(whitePositions, blackPositions)
  }

  setAvaliableCellsForAllFigures(positions) {
    for (const key in this.teams) {
      this.teams[key].forEach((f) => f.setAvailablePositions(positions.get(f)))
    }
  }

  checkForCheck(teamColor, attackingPositions) {
    let isCheck = false
    const king = this.teams[teamColor].find(f => f.name === 'king')
    const kingPositionId = `${king.position.row}${king.position.pos}`

    const attackingTeamColor = teamColor === 'white' ? 'black' : 'white'

    const allAttackingAvailablePositions = attackingPositions || this.teams[attackingTeamColor].reduce((acc, f) => ({ ...acc, ...f.avaliablePositions }), {})

    if (!isCheck && allAttackingAvailablePositions[kingPositionId]) {
      isCheck = true
    }

    return isCheck
  }

  checkForMat(teamColor, gameState) {

    const defendingTeam = this.teams[teamColor]
    const attackingTeamColor = teamColor === 'white' ? 'black' : 'white'

    defendingTeam.forEach((f) => {
      const remainingPositions = {}
      const { avaliablePositions } = f
      const prevId = `${f.position.row}${f.position.pos}`;
      for (const key in avaliablePositions) {
        const copyGameState = {
          ...gameState,
          [key]: f,
          [prevId]: null,
        }

        const attackingAvaliablePositionsMap = this.calculateAvaliableCellsForTeam(copyGameState, attackingTeamColor)
        let attackingAvaliablePositions = {}
        attackingAvaliablePositionsMap.forEach((value) => {
          attackingAvaliablePositions = { ...attackingAvaliablePositions, ...value }
        })

        if (!this.checkForCheck(teamColor, attackingAvaliablePositions)) {
          remainingPositions[key] = true
        }
      }
      f.setAvailablePositions(remainingPositions)
    })

    const avaliableFigures = defendingTeam.filter(f => !!Object.values(f.avaliablePositions).length)
    console.log(avaliableFigures, teamColor);
    return !avaliableFigures.length
  }

}
