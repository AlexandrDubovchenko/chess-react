import React from 'react'
import { Game } from '../classes/Game';

export const game = new Game()

export const initialGameState = game.initialGameState

export const GameContext = React.createContext()

export const GameProvider = GameContext.Provider
