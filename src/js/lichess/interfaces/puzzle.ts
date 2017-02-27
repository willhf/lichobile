export interface PuzzleData {
  puzzle: Puzzle
  mode: string
}

export interface Puzzle {
  id: string
  rating: number
  attempts: number
  fen: string
  color: Color
  initialMove: string
  initialPly: number
  gameId: string
  lines: Array<Line>
  enabled: boolean
  vote: number
}

export interface Line {
  move: string
  lines?: Array<Line>
}
