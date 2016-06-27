import backbutton from '../../backbutton';
import m from 'mithril';
import { notify as notifyXhr } from '../../xhr';

const notify = {};

notify.isOpen = false;

notify.open = function() {
  backbutton.stack.push(notify.close);
  notify.isOpen = true;
};

notify.close = function(fromBB) {
  if (fromBB !== 'backbutton' && notify.isOpen) backbutton.stack.pop();
  notify.isOpen = false;
};

notify.update = function(data) {
  notify.data = data;
  m.redraw();
};

notify.loadFirstPage = function() {
  notifyXhr().then(notify.update);
};

notify.nextPage = function() {
  if (!notify.data.pager.nextPage) return;
  notify.vm.scrolling = true;
  notifyXhr(notify.data.pager.nextPage).then(notify.update);
  m.redraw();
};

notify.previousPage = function() {
  if (!notify.data.pager.previousPage) return;
  notify.vm.scrolling = true;
  notifyXhr(notify.data.pager.previousPage).then(notify.update);
  m.redraw();
};

export default notify;
