import * as helper from '../helper';
import socket from '../../socket';
import view from './trainingView';

interface Attrs {
  id: string
}

interface State {
}

const PuzzleScreen: Mithril.Component<Attrs, State> = {
  oninit({ attrs }) {
    helper.analyticsTrackView('Puzzle');
    socket.createDefault();

  },
  oncreate: helper.viewFadeIn,
  onremove() {
    window.plugins.insomnia.allowSleepAgain();
  },
  view
}

export default PuzzleScreen
