import React, { useContext, useMemo } from 'react';
import { Figure } from '../Figure';
import { GameContext } from '../../provider/gameProvider';
import { SocketContext } from '../../provider/socketProvider';

export const Cell = ({ cell, id }) => {
  const {
    gameState,
    selectedFigure,
    setSelectedFigure,
    moveToCell,
    activeTeam,
    myTeam,
  } = useContext(GameContext);
  const { socket } = useContext(SocketContext);
  const figure = gameState[id];

  const isAvailableToMove = useMemo(
    () => selectedFigure?.availablePositions[id],
    [selectedFigure, id]
  );
  const handleTouch = () => {
    if (figure && figure.color === activeTeam && figure.color === myTeam) {
      setSelectedFigure(figure);
    }
  };

  const handleCellClick = () => {
    if (!selectedFigure) {
      handleTouch();
      return;
    }
    if (figure?.color === selectedFigure?.color) {
      setSelectedFigure(gameState[cell]);
      return;
    }

    const availablePosition = selectedFigure.availablePositions[id];

    if (availablePosition) {
      const figureId = `${selectedFigure.position.row}${selectedFigure.position.pos}`;
      socket.emit('move', {
        figureId,
        cell: id,
        availablePosition,
      });
      moveToCell({ figureId, cell: id, availablePosition });
      return;
    }

    setSelectedFigure(null);
  };

  return (
    <div
      id={id}
      onClick={handleCellClick}
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
