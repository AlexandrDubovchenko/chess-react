import { Bishop } from "./Bishop";
import { Figure } from "./Figure";
import { Rook } from "./Rook";

export class Queen extends Figure {
  name = 'queen'

  calculateAvaliablePositions(gameState) {
    const bishop = new Bishop(this)

    const rook = new Rook(this)

    return { ...rook.calculateAvaliablePositions(gameState), ...bishop.calculateAvaliablePositions(gameState) }
  }
}
