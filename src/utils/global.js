import Emitter from 'eventemitter3';
let emitter = new Emitter();

let email = undefined;
export function setEmail(newEmail) {
  email = newEmail;
}
export function getEmail() {
  return email;
}

export function setLoading(newLoading) {
  emitter.emit('loading', newLoading);
}

export function onLoadingChange(handler) {
  emitter.on('loading', handler);
}

export function offLoadingChange(handler) {
  emitter.off('loading', handler);
}
