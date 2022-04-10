import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Row } from '../Row';
import { createBoardMatrix } from '../../utils/createBoard';
import {
  GameProvider,
  initialGameState,
  game,
} from '../../provider/gameProvider';
import { SocketContext } from '../../provider/socketProvider';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const Board = () => {
  const { socket } = useContext(SocketContext);
  const boardMatrix = useMemo(() => createBoardMatrix(), []);
  const [gameState, setGameState] = useState(initialGameState);
  const [myTeam, setMyTeam] = useState();
  const [selectedFigure, setSelectedFigure] = useState();
  const [activeTeam, setActiveTeam] = useState();
  const [isCheck, setIsCheck] = useState(false);
  const [isMate, setIsMate] = useState(false);

  useEffect(() => {
    setSelectedFigure(null);
    game.setAvailableCellsForAllFigures(
      game.calculateAvailableCellsForAllFigures(gameState)
    );
    setActiveTeam((prev) => (prev === 'black' || !prev ? 'white' : 'black'));
  }, [gameState]);

  useEffect(() => {
    if (activeTeam) {
      setIsCheck(game.checkForCheck(activeTeam));
    }
  }, [activeTeam]);

  useEffect(() => {
    if (isCheck) {
      setIsMate(game.checkForMat(activeTeam));
    }
  }, [activeTeam, isCheck]);

  const makeCasteling = useCallback(
    ({ figure, availablePosition, cell, prevId }) => {
      const direction = availablePosition.castlingType === 'short' ? -1 : +1;
      const rook = gameState[availablePosition.rookPosition];
      rook.position = {
        ...rook.position,
        pos: figure.position.pos + direction,
      };
      const newRookId = `${rook.position.row}${rook.position.pos}`;
      setGameState({
        ...gameState,
        [cell]: figure,
        [prevId]: null,
        [availablePosition.rookPosition]: null,
        [newRookId]: rook,
      });
      return;
    },
    [gameState]
  );

  const moveToCell = useCallback(
    ({ figureId, cell, availablePosition }) => {
      const figure = gameState[figureId];
      figure.isTouched = true;
      figure.position = {
        row: +cell[0],
        pos: +cell[1],
      };

      if (availablePosition?.isCasteling) {
        makeCasteling(figure, availablePosition, cell, figureId);
        return;
      }

      if (gameState[cell]) {
        game.removeFigure(gameState[cell]);
      }

      setGameState({
        ...gameState,
        [cell]: figure,
        [figureId]: null,
      });
    },
    [gameState, makeCasteling]
  );

  useEffect(() => {
    if (socket) {
      socket.off('move_finished');
      socket.on('move_finished', moveToCell);
    }
  }, [moveToCell, socket]);

  useEffect(() => {
    if (socket) {
      socket.on('joined', ({ team }) => setMyTeam(team));
    }
  }, [socket]);

  return (
    <GameProvider
      value={{
        gameState,
        setGameState,
        selectedFigure,
        setSelectedFigure,
        moveToCell,
        makeCasteling,
        activeTeam,
        myTeam,
      }}
    >
      {isMate && <p>Winner is {activeTeam === 'white' ? 'black' : 'white'}</p>}
      {boardMatrix.map((row, i) => (
        <Row id={i} key={rows[i]} row={row} />
      ))}
    </GameProvider>
  );
};
