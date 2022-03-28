import React, { useEffect, useMemo, useState } from 'react';
import { Row } from '../Row';
import { createBoardMatrix } from '../../utils/createBoard';
import { GameProvider, initialGameState } from '../provider/gameProvider';
import {
  calculateAvaliableCellsForAllFigures,
} from '../../utils/calculateAvaliableCells';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const Board = () => {
  const boardMatrix = useMemo(() => createBoardMatrix(), []);
  const [gameState, setGameState] = useState(initialGameState);
  const [selectedFigure, setSelectedFigure] = useState();

  useEffect(() => {
    setSelectedFigure(null);
    calculateAvaliableCellsForAllFigures(gameState);
  }, [gameState]);

  const moveToCell = (cell) => {
    if (selectedFigure.avaliablePositions[cell]) {
      const prevPosition = {...selectedFigure.position}
      selectedFigure.position = {
        row: +cell[0],
        pos: +cell[1],
      };
      setGameState({
        ...gameState,
        [cell]: selectedFigure,
        [`${prevPosition.row}${prevPosition.pos}`]: null,
      });
    } else {
      if (gameState[cell]?.color === selectedFigure?.color) {
        setSelectedFigure(gameState[cell]);
      } else {
        setSelectedFigure(null);
      }
    }
  };

  return (
    <GameProvider
      value={{
        gameState,
        setGameState,
        selectedFigure,
        setSelectedFigure,
        moveToCell,
      }}
    >
      {boardMatrix.map((row, i) => (
        <Row id={i} key={rows[i]} row={row} />
      ))}
    </GameProvider>
  );
};
