const figureImages = {
  pawn: {
    black: '/assets/pawn-black.svg',
    white: '/assets/pawn-white.svg',
  },
  rook: {
    black: '/assets/rook-black.svg',
    white: '/assets/rook-white.svg',
  },
  knight: {
    black: '/assets/knight-black.svg',
    white: '/assets/knight-white.svg',
  },
  bishop: {
    black: '/assets/bishop-black.svg',
    white: '/assets/bishop-white.svg',
  },
  queen: {
    black: '/assets/queen-black.svg',
    white: '/assets/queen-white.svg',
  },
  king: {
    black: '/assets/king-black.svg',
    white: '/assets/king-white.svg',
  },
};

export const getFigureImage = (figure) => {
  return figureImages[figure.name][figure.color]
}

