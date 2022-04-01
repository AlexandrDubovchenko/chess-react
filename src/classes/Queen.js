import { Bishop } from "./Bishop";
import { Figure } from "./Figure";
import { Rook } from "./Rook";

export class Queen extends Figure {
  name = 'queen'

  calculateAvailablePositions(gameState) {
    const bishop = new Bishop(this)

    const rook = new Rook(this)

    return { ...rook.calculateAvailablePositions(gameState), ...bishop.calculateAvailablePositions(gameState) }
  }
}
