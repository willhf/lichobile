import helper from './helper';
import i18n from '../i18n';
import backbutton from '../backbutton';
import { gameIcon } from '../utils';
import m from 'mithril';

const notifyModal = {};

notifyModal.isOpen = false;

notifyModal.open = function() {
  backbutton.stack.push(notifyModal.close);
  notifyModal.isOpen = true;
};

notifyModal.close = function(fromBB) {
  if (fromBB !== 'backbutton' && notifyModal.isOpen) backbutton.stack.pop();
  notifyModal.isOpen = false;
};

notifyModal.update = function(data, incoming) {
  notifyModal.data = data;
  m.redraw();
};

notifyModal.loadFirstPage = function() {
  xhr.load().then(notifyModal.update);
};

notifyModal.nextPage = function() {
  if (!notifyModal.data.pager.nextPage) return;
  notifyModal.vm.scrolling = true;
  xhr.load(notifyModal.data.pager.nextPage).then(notifyModal.update);
  m.redraw();
};

notifyModal.previousPage = function() {
  if (!notifyModal.data.pager.previousPage) return;
  notifyModal.vm.scrolling = true;
  xhr.load(notifyModal.data.pager.previousPage).then(notifyModal.update);
  m.redraw();
};


const animateClose = helper.slidesOutRight(notifyModal.close, 'notifyModal');

notifyModal.view = function() {
  if (!notifyModal.isOpen) return null;

  return m('div.modal#notifyModal', { config: helper.slidesInLeft }, [
    m('header', [
      m('button.modal_close[data-icon=L]', {
        config: helper.ontouch(animateClose)
      }),
      m('h2', i18n('notifications'))
    ]),
    m('div.modal_content', {}, [
      m('ul.notifyEntries.native_scroller')
    ])
  ]);
};

function renderTourJoin(entry) {
  const fromNow = window.moment(entry.date).fromNow();
  const entryText = i18n('xCompetesInY', entry.data.userId, entry.data.tourName);
  const key = 'tour' + entry.date;

  return (
    <li className="list_item bglight notifyEntry" key={key}
      config={helper.ontouch(() => {
        animateClose().then(() =>
          m.route('/tournament/' + entry.data.tourId)
        );
      })}
    >
      <span className="fa fa-arrow-circle-right" />
      {m.trust(entryText.replace(/^(\w+)\s/, '<strong>$1&nbsp;</strong>'))}
      <small><em>&nbsp;{fromNow}</em></small>
    </li>
  );
}

function renderFollow(entry) {
  const fromNow = window.moment(entry.date).fromNow();
  const entryText = i18n('xStartedFollowingY', entry.data.u1, entry.data.u2);
  const key = 'follow' + entry.date;

  return (
    <li className="list_item bglight notifyEntry" key={key}
      config={helper.ontouch(() => {
        animateClose().then(() =>
          m.route('/@/' + entry.data.u1)
        );
      })}
    >
      <span className="fa fa-arrow-circle-right" />
      {m.trust(entryText.replace(/^(\w+)\s/, '<strong>$1&nbsp;</strong>'))}
      <small><em>&nbsp;{fromNow}</em></small>
    </li>
  );
}

function renderGameEnd(entry) {
  const icon = gameIcon(entry.data.perf);
  const result = entry.data.win ? 'Victory' : 'Defeat';
  const fromNow = window.moment(entry.date).fromNow();
  const key = 'game-end' + entry.date;

  return (
    <li className="list_item bglight notifyEntry" key={key} data-icon={icon}
      config={helper.ontouch(() => {
        return animateClose().then(() =>
          m.route('/game/' + entry.data.playerId)
        );
      })}
    >
      <strong>{result}</strong> vs. {entry.data.opponent}
      <small><em>&nbsp;{fromNow}</em></small>
    </li>
  );
}

export default notifyModal;
