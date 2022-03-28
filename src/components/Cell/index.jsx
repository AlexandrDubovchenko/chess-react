import React, { useContext, useMemo } from 'react';
import { Figure } from '../Figure';
import { GameContext } from '../provider/gameProvider';

export const Cell = ({ cell, id }) => {
  const { gameState, selectedFigure, setSelectedFigure, moveToCell } = useContext(GameContext);

  const figure = gameState[id];

  const isAvaliableToMove = useMemo(
    () => selectedFigure?.avaliablePositions[id],
    [selectedFigure, id]
  );

  const selectCurrentFigure = () => {
    if (selectedFigure && selectedFigure !== figure) {
      moveToCell(id);
    } else {
      if (figure) {
        setSelectedFigure(figure);
      }
    }
  };

  return (
    <div
      id={id}
      onClick={selectCurrentFigure}
      className='cell'
      style={{
        background: !(selectedFigure && figure === selectedFigure) ? cell.color : '#EEE8AA',
      }}
    >
      {figure && <Figure figure={figure} />}
      {isAvaliableToMove && <div className='avaliableDot' />}
    </div>
  );
};