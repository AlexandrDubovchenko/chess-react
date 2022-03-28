import React from 'react'
import { getInitialGameState } from '../../utils/getInitialGameState';

export const initialGameState = getInitialGameState()

export const GameContext = React.createContext()

export const GameProvider = GameContext.Provider
