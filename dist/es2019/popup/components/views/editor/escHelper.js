/**
 * Subscribes to the window 'keydown' event, calls escHandler when ESC is pressed.
 * Call unload() to unsubscribe from the window event.
 */
export class EscHelper {
    constructor(escHandler) {
        this.escHandler = escHandler;
        this.keyDownListener = event => this.onKeyDown(event);
        window.addEventListener('keydown', this.keyDownListener);
        window.focus();
    }
    teardown() {
        window.removeEventListener('keydown', this.keyDownListener);
    }
    onKeyDown(event) {
        if (event.key === 'Escape' || event.which === 27) {
            this.escHandler();
        }
    }
}
//# sourceMappingURL=escHelper.js.map