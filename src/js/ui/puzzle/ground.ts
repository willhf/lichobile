import chessground from '../../chessground'
import { batchRequestAnimationFrame } from '../../utils/batchRAF';

export default function(data, config, pref, onMove) {
  return new chessground.controller({
    fen: config.fen,
    batchRAF: batchRequestAnimationFrame,
    check: config.check,
    lastMove: config.lastMove,
    orientation: data.puzzle.color,
    coordinates: pref.coords !== 0,
    movable: {
      free: false,
      color: config.movable.color,
      dests: config.movable.dests,
      rookCastle: pref.rookCastle
    },
    draggable: {
      squareTarget: true
    },
    selectable: {
      enabled: pref.moveEvent !== 1
    },
    events: {
      move: onMove
    },
    premovable: {
      enabled: true
    },
    highlight: {
      lastMove: pref.highlight,
      check: pref.highlight,
      dragOver: true
    },
    animation: {
      enabled: true,
      duration: pref.animation.duration
    },
    disableContextMenu: true
  });
};
