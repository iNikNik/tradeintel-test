
import { addTick, hydrate } from '../../redux/modules/price';
import { INITIAL_DATA, NEW_TICK } from './MessageTypes';

function createSocketUrl() {
  return `ws://${window.location.hostname || 'localhost'}:3008`;
}

export function ticksHandler(dispatch) {
  const ws = new WebSocket(createSocketUrl());

  ws.onopen = function open() {
    ws.send('something good!');
  };

  ws.onmessage = (messageEvent) => {
    const message = JSON.parse(messageEvent.data);

    switch (message.type) {
      case NEW_TICK:
        const tick = message.body;
        dispatch(addTick({ ...tick, date: new Date(tick.date) }));
        break;
      case INITIAL_DATA:
        const ticks = message.body;
        dispatch(hydrate(ticks.map(el => ({ ...el, date: new Date(el.date) }))));
        break;
      default:
        break;
    }
  };

  return ws;
}
