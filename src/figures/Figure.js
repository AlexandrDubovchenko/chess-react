export class Figure {
  position
  name
  color
  avaliablePositions = {}
  constructor({ position, name, color }) {
    this.name = name
    this.position = position
    this.color = color
  }
}
