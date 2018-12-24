import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxScrollLockComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxScrollLockModule {
}
NgxScrollLockModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxScrollLockComponent],
                imports: [],
                exports: [NgxScrollLockComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxScrollLockComponent, NgxScrollLockModule };

//# sourceMappingURL=ngx-scroll-lock.js.map