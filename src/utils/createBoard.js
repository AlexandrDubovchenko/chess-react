const ROWS_COUNT = 8
const CELLS_COUNT = 8

export const CellsColors = {
  BLACK: "#663300",
  WHITE: "#BA8E4A"
}

const getCellColor = (row, cell) => {
  if (row % 2 !== 0) {
    return cell % 2 !== 0 ? CellsColors.BLACK : CellsColors.WHITE
  } else {
    return cell % 2 === 0 ? CellsColors.BLACK : CellsColors.WHITE
  }
}

export const createBoardMatrix = () => {
  const matrix = []
  for (let i = 0; i < ROWS_COUNT; i++) {
    matrix[i] = []
    for (let j = 0; j < CELLS_COUNT; j++) {
      matrix[i].push({
        color: getCellColor(i + 1, j + 1),
        figure: null
      })
    }
  }
  return matrix.reverse()
}


