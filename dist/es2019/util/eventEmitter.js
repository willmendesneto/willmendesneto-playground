import { EventEmitter2 } from 'eventemitter2';
export class GenericEventEmitter {
    constructor() {
        this.emitter = new EventEmitter2({
            wildcard: true,
        });
    }
    once(event, listener) {
        this.emitter.once(event, listener);
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    onAny(listener) {
        this.emitter.onAny(listener);
    }
    addListener(event, listener) {
        this.emitter.addListener(event, listener);
    }
    off(event, listener) {
        this.emitter.off(event, listener);
    }
    removeListener(event, handler) {
        this.emitter.removeListener(event, handler);
    }
    removeAllListeners(event) {
        // We want to explicitly call removeAllListeners without any argument if event is undefined, otherwise will EventEmitter fail
        if (event === undefined) {
            this.emitter.removeAllListeners();
        }
        else {
            this.emitter.removeAllListeners(event);
        }
    }
    emit(event, payload) {
        return this.emitter.emit(event, payload);
    }
}
//# sourceMappingURL=eventEmitter.js.map