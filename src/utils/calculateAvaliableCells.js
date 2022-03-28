import { teams } from "./getInitialGameState"

const calculateAvaliableForPawns = (figure, gameState) => {
  const cells = []
  const { row, pos } = figure.position
  let possibleId
  const nextRow = figure.color === "white" ? row - 1 : row + 1
  possibleId = `${nextRow}${pos}`
  if (!gameState[possibleId]) {
    cells.push(possibleId)
  }
  possibleId = `${nextRow}${pos + 1}`
  if (gameState[possibleId] && gameState[possibleId]?.color !== figure.color) {
    cells.push(possibleId)
  }
  possibleId = `${nextRow}${pos - 1}`
  if (gameState[possibleId] && gameState[possibleId]?.color !== figure.color) {
    cells.push(possibleId)
  }
  return cells.reduce((acc, el) => ({ ...acc, [el]: true }), {})
}

const calculateAvaliableForKnight = (figure, gameState) => {
  const maxSteps = 3
  const result = {}
  const { row, pos } = figure.position
  for (let i = -2; i <= 2; i++) {
    if (!i) {
      continue
    }
    const stepsLeft = maxSteps - Math.abs(i)
    const possibleLeftId = `${row + i}${pos - stepsLeft}`
    const possibleRightId = `${row + i}${pos + stepsLeft}`
    if (!(gameState[possibleLeftId]?.color === figure.color)) {
      result[possibleLeftId] = true
    }
    if (!(gameState[possibleRightId]?.color === figure.color)) {
      result[possibleRightId] = true
    }
  }

  return result

}

const checkCell = (id, gameState, figure) => {
  if (!gameState[id]) {
    return true
  } else if (gameState[id]?.color !== figure.color) {
    return true
  } else {
    return false
  }
}

const calculateAvaliableForBishop = (figure, gameState) => {
  const result = {}
  const { row, pos } = figure.position
  let curRow = row + 1;
  let curPos = pos + 1

  while (curPos < 8 && curRow < 8) {
    const id = `${curRow}${curPos}`
    if (checkCell(id, gameState, figure)) {
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
    if (checkCell(id, gameState, figure)) {
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

  while (curRow >= 0 && curPos <= 8) {
    const id = `${curRow}${curPos}`
    if (checkCell(id, gameState, figure)) {
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

  while (curRow <= 8 && curPos >= 0) {
    const id = `${curRow}${curPos}`
    if (checkCell(id, gameState, figure)) {
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

export const calculateAvaliableCellsForRook = (figure, gameState) => {

}

export const calculateAvaliableCells = (figure, gameState) => {

  switch (figure.name) {
    case "pawn":
      return calculateAvaliableForPawns(figure, gameState)
    case "knight":
      console.log(figure);
      return calculateAvaliableForKnight(figure, gameState)

    case "bishop":
      return calculateAvaliableForBishop(figure, gameState)
    default:
      return {}
  }
}

export const calculateAvaliableCellsForAllFigures = (gameState) => {
  teams.white.forEach((f) => {
    f.avaliablePositions = calculateAvaliableCells(f, gameState)
  })

  teams.black.forEach((f) => {
    f.avaliablePositions = calculateAvaliableCells(f, gameState)
  })
}
