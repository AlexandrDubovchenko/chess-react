import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Row } from '../Row';
import { createBoardMatrix } from '../../utils/createBoard';
import { GameProvider, initialGameState, game } from '../provider/gameProvider';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const Board = () => {
  const boardMatrix = useMemo(() => createBoardMatrix(), []);
  const [gameState, setGameState] = useState(initialGameState);
  const [selectedFigure, setSelectedFigure] = useState();
  const activeTeam = useRef();
  const [isCheck, setIsCheck] = useState(false);
  const [isMate, setIsMate] = useState(false);

  useEffect(() => {
    setSelectedFigure(null);
    game.setAvaliableCellsForAllFigures(
      game.calculateAvaliableCellsForAllFigures(gameState)
    );
    setIsCheck(
      game.checkForCheck(activeTeam.current === 'white' ? 'black' : 'white')
    );
    activeTeam.current =
      activeTeam.current === 'black' || !activeTeam.current ? 'white' : 'black';
  }, [gameState]);

  useEffect(() => {
    if (isCheck) {
      setIsMate(game.checkForMat(activeTeam.current));
    }
  }, [isCheck]);

  const moveToCell = (cell) => {
    if (selectedFigure.avaliablePositions[cell]) {
      const prevId = `${selectedFigure.position.row}${selectedFigure.position.pos}`;
      selectedFigure.position = {
        row: +cell[0],
        pos: +cell[1],
      };
      selectedFigure.isTouched = true;
      if (gameState[cell]) {
        game.removeFigure(gameState[cell]);
      }
      setGameState({
        ...gameState,
        [cell]: selectedFigure,
        [prevId]: null,
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
        activeTeam: activeTeam.current,
      }}
    >
      {isMate && <p>
          Winner is {activeTeam.current === 'white' ? 'black' : 'white'}
        </p>}
      {boardMatrix.map((row, i) => (
        <Row id={i} key={rows[i]} row={row} />
      ))}
    </GameProvider>
  );
};
