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
    game.setAvailableCellsForAllFigures(
      game.calculateAvailableCellsForAllFigures(gameState)
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

  const makeCasteling = (availablePosition, cell, prevId) => {
    const direction = availablePosition.castlingType === 'short' ? -1 : +1;
    const rook = gameState[availablePosition.rookPosition];
    rook.position = {
      ...rook.position,
      pos: selectedFigure.position.pos + direction,
    };
    const newRookId = `${rook.position.row}${rook.position.pos}`
    setGameState({
      ...gameState,
      [cell]: selectedFigure,
      [prevId]: null,
      [availablePosition.rookPosition]: null,
      [newRookId]: rook
    });
    return;
  };

  const moveToCell = (cell) => {
    const availablePosition = selectedFigure.availablePositions[cell];
    if (availablePosition) {
      const prevId = `${selectedFigure.position.row}${selectedFigure.position.pos}`;
      selectedFigure.position = {
        row: +cell[0],
        pos: +cell[1],
      };
      selectedFigure.isTouched = true;

      if (availablePosition?.isCastling) {
        makeCasteling(availablePosition, cell, prevId);
        return;
      }

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
      {isMate && (
        <p>Winner is {activeTeam.current === 'white' ? 'black' : 'white'}</p>
      )}
      {boardMatrix.map((row, i) => (
        <Row id={i} key={rows[i]} row={row} />
      ))}
    </GameProvider>
  );
};
