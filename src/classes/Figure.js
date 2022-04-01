export class Figure {
  position
  name
  color
  availablePositions = {}
  isTouched = false
  constructor({ position, name, color }) {
    this.name = name
    this.position = position
    this.color = color
  }

  setAvailablePositions(positions) {
    this.availablePositions = positions
  }

}
