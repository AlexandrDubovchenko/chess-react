export class Figure {
  position
  name
  color
  avaliablePositions = {}
  isTouched = false
  constructor({ position, name, color }) {
    this.name = name
    this.position = position
    this.color = color
  }

  setAvailablePositions(positions) {
    this.avaliablePositions = positions
  }

}
