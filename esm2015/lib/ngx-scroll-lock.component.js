/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, } from '@angular/core';
export class NgxScrollLockComponent {
    constructor() {
        this.target = '';
        this.lock = false;
        this._listenerOptions = {
            capture: false,
            passive: false,
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._targetElement = this.target
            ? document.querySelector(this.target)
            : document.body;
        if (this.lock) {
            this.disableLock(this._targetElement);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.enableLock(this._targetElement);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.target &&
            !changes.target.firstChange &&
            changes.target.previousValue !== changes.target.currentValue) {
            this.enableLock(this._targetElement);
            this._targetElement = this.target
                ? document.querySelector(this.target)
                : document.body;
            if (this.lock) {
                this.disableLock(this._targetElement);
            }
        }
        if (changes.lock &&
            !changes.lock.firstChange &&
            changes.lock.previousValue !== changes.lock.currentValue) {
            changes.lock.currentValue
                ? this.disableLock(this._targetElement)
                : this.enableLock(this._targetElement);
        }
    }
    /**
     * @param {?} target
     * @return {?}
     */
    disableLock(target) {
        this._targetElement.classList.add('ngx-scroll-lock');
        // Mobile Safari ignores { overflow: hidden } declaration on the body.
        this._targetElement.addEventListener('touchmove', this.preventTouchMove, this._listenerOptions);
    }
    /**
     * @param {?} target
     * @return {?}
     */
    enableLock(target) {
        this._targetElement.classList.remove('ngx-scroll-lock');
        this._targetElement.removeEventListener('touchmove', this.preventTouchMove, this._listenerOptions);
    }
    /**
     * @return {?}
     */
    isTouchDevice() {
        if (typeof window === 'undefined' || !window)
            return false;
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    /**
     * @param {?} rawEvent
     * @return {?}
     */
    preventTouchMove(rawEvent) {
        /** @type {?} */
        const e = rawEvent || Object.assign({}, window.event, { touches: [] });
        // // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom)
        if (e.touches && e.touches.length > 1)
            return true;
        if (e.preventDefault)
            e.preventDefault();
        return false;
    }
}
NgxScrollLockComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-scroll-lock',
                template: `
    <style>
      .ngx-scroll-lock {
        box-sizing: border-box !important;
        overflow: hidden !important;
        position: inherit !important;
      }
    </style>
    <ng-content></ng-content>
  `,
                encapsulation: ViewEncapsulation.None
            }] }
];
NgxScrollLockComponent.propDecorators = {
    target: [{ type: Input }],
    lock: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgxScrollLockComponent.prototype.target;
    /** @type {?} */
    NgxScrollLockComponent.prototype.lock;
    /**
     * @type {?}
     * @private
     */
    NgxScrollLockComponent.prototype._targetElement;
    /**
     * @type {?}
     * @private
     */
    NgxScrollLockComponent.prototype._listenerOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNjcm9sbC1sb2NrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY3JvbGwtbG9jay8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtc2Nyb2xsLWxvY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFHTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFnQnZCLE1BQU0sT0FBTyxzQkFBc0I7SUFkbkM7UUFnQkUsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdaLFNBQUksR0FBRyxLQUFLLENBQUM7UUFJTCxxQkFBZ0IsR0FBRztZQUN6QixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztJQTZFSixDQUFDOzs7O0lBM0VDLFFBQVE7UUFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQy9CLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQ0UsT0FBTyxDQUFDLE1BQU07WUFDZCxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVztZQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFDNUQ7WUFDQSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNO2dCQUMvQixDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdkM7U0FDRjtRQUNELElBQ0UsT0FBTyxDQUFDLElBQUk7WUFDWixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVztZQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDeEQ7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVk7Z0JBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQW1CO1FBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXJELHNFQUFzRTtRQUN0RSxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUNsQyxXQUFXLEVBQ1gsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQ3RCLENBQUM7SUFDSixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxNQUFtQjtRQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUNyQyxXQUFXLEVBQ1gsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQ3RCLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzNELE9BQU8sY0FBYyxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsUUFBb0I7O2NBQzdCLENBQUMsR0FBRyxRQUFRLHNCQUFTLE1BQU0sQ0FBQyxLQUFLLElBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRTtRQUV0RCw0SEFBNEg7UUFDNUgsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUVuRCxJQUFJLENBQUMsQ0FBQyxjQUFjO1lBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBdEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOzs7cUJBRUUsS0FBSzttQkFHTCxLQUFLOzs7O0lBSE4sd0NBQ1k7O0lBRVosc0NBQ2E7Ozs7O0lBRWIsZ0RBQW9DOzs7OztJQUVwQyxrREFHRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXNjcm9sbC1sb2NrJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3R5bGU+XG4gICAgICAubmd4LXNjcm9sbC1sb2NrIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XG4gICAgICAgIHBvc2l0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgPC9zdHlsZT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE5neFNjcm9sbExvY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgdGFyZ2V0ID0gJyc7XG5cbiAgQElucHV0KClcbiAgbG9jayA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3RhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgX2xpc3RlbmVyT3B0aW9ucyA9IHtcbiAgICBjYXB0dXJlOiBmYWxzZSxcbiAgICBwYXNzaXZlOiBmYWxzZSxcbiAgfTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl90YXJnZXRFbGVtZW50ID0gdGhpcy50YXJnZXRcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldClcbiAgICAgIDogZG9jdW1lbnQuYm9keTtcblxuICAgIGlmICh0aGlzLmxvY2spIHtcbiAgICAgIHRoaXMuZGlzYWJsZUxvY2sodGhpcy5fdGFyZ2V0RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5lbmFibGVMb2NrKHRoaXMuX3RhcmdldEVsZW1lbnQpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXMudGFyZ2V0ICYmXG4gICAgICAhY2hhbmdlcy50YXJnZXQuZmlyc3RDaGFuZ2UgJiZcbiAgICAgIGNoYW5nZXMudGFyZ2V0LnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXMudGFyZ2V0LmN1cnJlbnRWYWx1ZVxuICAgICkge1xuICAgICAgdGhpcy5lbmFibGVMb2NrKHRoaXMuX3RhcmdldEVsZW1lbnQpO1xuICAgICAgdGhpcy5fdGFyZ2V0RWxlbWVudCA9IHRoaXMudGFyZ2V0XG4gICAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldClcbiAgICAgICAgOiBkb2N1bWVudC5ib2R5O1xuICAgICAgaWYgKHRoaXMubG9jaykge1xuICAgICAgICB0aGlzLmRpc2FibGVMb2NrKHRoaXMuX3RhcmdldEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmxvY2sgJiZcbiAgICAgICFjaGFuZ2VzLmxvY2suZmlyc3RDaGFuZ2UgJiZcbiAgICAgIGNoYW5nZXMubG9jay5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzLmxvY2suY3VycmVudFZhbHVlXG4gICAgKSB7XG4gICAgICBjaGFuZ2VzLmxvY2suY3VycmVudFZhbHVlXG4gICAgICAgID8gdGhpcy5kaXNhYmxlTG9jayh0aGlzLl90YXJnZXRFbGVtZW50KVxuICAgICAgICA6IHRoaXMuZW5hYmxlTG9jayh0aGlzLl90YXJnZXRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlTG9jayh0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5fdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCduZ3gtc2Nyb2xsLWxvY2snKTtcblxuICAgIC8vIE1vYmlsZSBTYWZhcmkgaWdub3JlcyB7IG92ZXJmbG93OiBoaWRkZW4gfSBkZWNsYXJhdGlvbiBvbiB0aGUgYm9keS5cbiAgICB0aGlzLl90YXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAndG91Y2htb3ZlJyxcbiAgICAgIHRoaXMucHJldmVudFRvdWNoTW92ZSxcbiAgICAgIHRoaXMuX2xpc3RlbmVyT3B0aW9uc1xuICAgICk7XG4gIH1cblxuICBlbmFibGVMb2NrKHRhcmdldDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLl90YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ25neC1zY3JvbGwtbG9jaycpO1xuXG4gICAgdGhpcy5fdGFyZ2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgJ3RvdWNobW92ZScsXG4gICAgICB0aGlzLnByZXZlbnRUb3VjaE1vdmUsXG4gICAgICB0aGlzLl9saXN0ZW5lck9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgaXNUb3VjaERldmljZSgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXdpbmRvdykgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xuICB9XG5cbiAgcHJldmVudFRvdWNoTW92ZShyYXdFdmVudDogVG91Y2hFdmVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGUgPSByYXdFdmVudCB8fCB7IC4uLndpbmRvdy5ldmVudCwgdG91Y2hlczogW10gfTtcblxuICAgIC8vIC8vIERvIG5vdCBwcmV2ZW50IGlmIHRoZSBldmVudCBoYXMgbW9yZSB0aGFuIG9uZSB0b3VjaCAodXN1YWxseSBtZWFuaW5nIHRoaXMgaXMgYSBtdWx0aSB0b3VjaCBnZXN0dXJlIGxpa2UgcGluY2ggdG8gem9vbSlcbiAgICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPiAxKSByZXR1cm4gdHJ1ZTtcblxuICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==