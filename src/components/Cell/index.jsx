import React, { useContext, useMemo } from 'react';
import { Figure } from '../Figure';
import { GameContext } from '../provider/gameProvider';

export const Cell = ({ cell, id }) => {
  const {
    gameState,
    selectedFigure,
    setSelectedFigure,
    moveToCell,
    activeTeam,
  } = useContext(GameContext);

  const figure = gameState[id];

  const isAvailableToMove = useMemo(
    () => selectedFigure?.availablePositions[id],
    [selectedFigure, id]
  );

  const selectCurrentFigure = () => {
    if (selectedFigure && selectedFigure !== figure) {
      moveToCell(id);
    } else {
      if (figure && figure.color === activeTeam) {
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
        background: !(selectedFigure && figure === selectedFigure)
          ? cell.color
          : '#EEE8AA',
      }}
    >
      {figure && <Figure figure={figure} />}
      {isAvailableToMove && <div className='availableDot' />}
    </div>
  );
};
