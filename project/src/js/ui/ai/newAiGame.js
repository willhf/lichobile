import i18n from '../../i18n';
import settings from '../../settings';
import formWidgets from '../shared/form';
import popupWidget from '../shared/popup';
import helper from '../helper';
import { tupleOf } from '../../utils';
import backbutton from '../../backbutton';

const colors = [
  ['white', 'white'],
  ['black', 'black'],
  ['randomColor', 'random']
];

export default {

  controller: function(root) {
    let isOpen = false;

    function open() {
      backbutton.stack.push(close);
      isOpen = true;
    }

    function close(fromBB) {
      if (fromBB !== 'backbutton' && isOpen) backbutton.stack.pop();
      isOpen = false;
    }

    return {
      open: open,
      close: close,
      isOpen: function() {
        return isOpen;
      },
      root: root
    };
  },

  view: function(ctrl) {
    if (ctrl.isOpen()) {
      return popupWidget(
        'new_offline_game',
        null,
        function() {
          return (
            <div className="game_form">
              <fieldset>
                {sideSelector()}
                <div className="select_input">
                  {formWidgets.renderSelect('variant', 'variant', settings.ai.availableVariants, settings.ai.variant)}
                </div>
              </fieldset>
              <fieldset>
                {formWidgets.renderCheckbox(i18n('clock'), 'clock', settings.ai.clock)}
                {
                  settings.ai.clock() ?
                  <div>
                    <div className="select_input inline">
                      {formWidgets.renderSelect('time', 'time',
                        settings.gameSetup.availableTimes, settings.ai.time, false)}
                    </div>
                    <div className="select_input inline">
                      {formWidgets.renderSelect('increment', 'increment',
                        settings.gameSetup.availableIncrements.map(tupleOf), settings.ai.increment, false)}
                    </div>
                  </div> : null
                }
              </fieldset>
              <button className="newGameButton" data-icon="E"
                config={helper.ontouch(() => ctrl.root.startNewGame())}>
                {i18n('createAGame')}
              </button>
            </div>
          );
        },
        ctrl.isOpen(),
        ctrl.close
      );
    }

    return null;
  }
};

function sideSelector() {
  return (
    <div className="select_input">
      {formWidgets.renderSelect('side', 'color', colors, settings.ai.color)}
    </div>
  );
}
