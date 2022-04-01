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
    if (typeof Game.instance === 'object') {
      return Game.instance
    }
    Game.instance = this
    if (!this.initialGameState) {
      this.initialGameState = this.initializeGame()
    }
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

  calculateAvailableCellsForTeam(gameState, team) {
    const positions = new Map()
    this.teams[team].forEach((f) => {
      const result = f.calculateAvailablePositions(gameState)
      positions.set(f, result)
    })
    return positions
  }

  calculateAvailableCellsForAllFigures(gameState) {

    const whitePositions = this.calculateAvailableCellsForTeam(gameState, 'white')
    const blackPositions = this.calculateAvailableCellsForTeam(gameState, 'black')

    return mergeMaps(whitePositions, blackPositions)
  }

  setAvailableCellsForAllFigures(positions) {
    for (const key in this.teams) {
      this.teams[key].forEach((f) => f.setAvailablePositions(positions.get(f)))
    }
  }

  checkIsCellAttacked(id, attackingTeamColor, attackingPositions) {
    const allAttackingAvailablePositions = attackingPositions || this.teams[attackingTeamColor].reduce((acc, f) => ({ ...acc, ...f.availablePositions }), {})
    if (allAttackingAvailablePositions[id]) {
      return true
    }
  }

  checkForCheck(teamColor, attackingPositions) {
    const king = this.teams[teamColor].find(f => f.name === 'king')
    const kingPositionId = `${king.position.row}${king.position.pos}`

    const attackingTeamColor = teamColor === 'white' ? 'black' : 'white'

    return this.checkIsCellAttacked(kingPositionId, attackingTeamColor, attackingPositions)
  }

  checkForMat(teamColor, gameState) {

    const defendingTeam = this.teams[teamColor]
    const attackingTeamColor = teamColor === 'white' ? 'black' : 'white'

    defendingTeam.forEach((f) => {
      const remainingPositions = {}
      const { availablePositions } = f
      const prevId = `${f.position.row}${f.position.pos}`;
      for (const key in availablePositions) {
        const copyGameState = {
          ...gameState,
          [key]: f,
          [prevId]: null,
        }

        const attackingAvailablePositionsMap = this.calculateAvailableCellsForTeam(copyGameState, attackingTeamColor)
        let attackingAvailablePositions = {}
        attackingAvailablePositionsMap.forEach((value) => {
          attackingAvailablePositions = { ...attackingAvailablePositions, ...value }
        })

        if (!this.checkForCheck(teamColor, attackingAvailablePositions)) {
          remainingPositions[key] = true
        }
      }
      f.setAvailablePositions(remainingPositions)
    })

    const AvailableFigures = defendingTeam.filter(f => !!Object.values(f.availablePositions).length)
    return !AvailableFigures.length
  }

}
