import React from 'react'
import { Cell } from '../Cell'

export const Row = ({ row, id }) => {
  return (
    <div className='row'>
      {row.map((cell, i) => (
        <Cell key={id + '' + i} id={id + '' + i} cell={cell} />
      ))}
    </div>
  )
}
