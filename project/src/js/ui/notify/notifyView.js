import notify from '.';
import helper from '../helper';
import i18n from '../../i18n';
import m from 'mithril';

const animateClose = helper.slidesOutRight(notify.close, 'notify');

export default function view() {
  if (!notify.isOpen) return null;

  return m('div.modal#notify', { config: helper.slidesInLeft }, [
    m('header', [
      m('button.modal_close[data-icon=L]', {
        config: helper.ontouch(animateClose)
      }),
      m('h2', i18n('timeline'))
    ]),
    m('div.modal_content', {}, [
      m('ul.notifyEntries.native_scroller')
    ])
  ]);
}
