import * as helper from '../helper'
import socket from '../../socket'
import view from './trainingView'

interface Attrs {
  id: string
}

interface State {
}

const PuzzleScreen: Mithril.Component<Attrs, State> = {
  oncreate: helper.viewFadeIn,

  oninit({ attrs }) {
    window.plugins.insomnia.keepAwake()
    helper.analyticsTrackView('Puzzle')
    socket.createDefault()
  },

  onremove() {
    window.plugins.insomnia.allowSleepAgain()
  },

  view
}

export default PuzzleScreen
