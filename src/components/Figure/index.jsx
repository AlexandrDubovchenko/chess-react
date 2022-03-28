import React, { memo } from 'react'
import { getFigureImage } from '../../utils/getFigureImage'

export const Figure = memo(({ figure }) => {
  if (!figure) {
    return null
  }
  return (
    <img src={getFigureImage(figure)} alt={figure.name + ' ' + figure.color} />
  )
})
