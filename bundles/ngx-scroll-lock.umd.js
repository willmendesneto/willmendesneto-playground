(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-scroll-lock', ['exports', '@angular/core'], factory) :
    (factory((global['ngx-scroll-lock'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxScrollLockComponent = /** @class */ (function () {
        function NgxScrollLockComponent() {
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
        NgxScrollLockComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this._targetElement = this.target
                    ? document.querySelector(this.target)
                    : document.body;
                if (this.lock) {
                    this.disableLock(this._targetElement);
                }
            };
        /**
         * @return {?}
         */
        NgxScrollLockComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.enableLock(this._targetElement);
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgxScrollLockComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
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
            };
        /**
         * @param {?} target
         * @return {?}
         */
        NgxScrollLockComponent.prototype.disableLock = /**
         * @param {?} target
         * @return {?}
         */
            function (target) {
                this._targetElement.classList.add('ngx-scroll-lock');
                // Mobile Safari ignores { overflow: hidden } declaration on the body.
                this._targetElement.addEventListener('touchmove', this.preventTouchMove, this._listenerOptions);
            };
        /**
         * @param {?} target
         * @return {?}
         */
        NgxScrollLockComponent.prototype.enableLock = /**
         * @param {?} target
         * @return {?}
         */
            function (target) {
                this._targetElement.classList.remove('ngx-scroll-lock');
                this._targetElement.removeEventListener('touchmove', this.preventTouchMove, this._listenerOptions);
            };
        /**
         * @return {?}
         */
        NgxScrollLockComponent.prototype.isTouchDevice = /**
         * @return {?}
         */
            function () {
                if (typeof window === 'undefined' || !window)
                    return false;
                return 'ontouchstart' in window || navigator.maxTouchPoints;
            };
        /**
         * @param {?} rawEvent
         * @return {?}
         */
        NgxScrollLockComponent.prototype.preventTouchMove = /**
         * @param {?} rawEvent
         * @return {?}
         */
            function (rawEvent) {
                /** @type {?} */
                var e = rawEvent || __assign({}, window.event, { touches: [] });
                // // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom)
                if (e.touches && e.touches.length > 1)
                    return true;
                if (e.preventDefault)
                    e.preventDefault();
                return false;
            };
        NgxScrollLockComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-scroll-lock',
                        template: "\n    <style>\n      .ngx-scroll-lock {\n        box-sizing: border-box !important;\n        overflow: hidden !important;\n        position: inherit !important;\n      }\n    </style>\n    <ng-content></ng-content>\n  ",
                        encapsulation: core.ViewEncapsulation.None
                    }] }
        ];
        NgxScrollLockComponent.propDecorators = {
            target: [{ type: core.Input }],
            lock: [{ type: core.Input }]
        };
        return NgxScrollLockComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxScrollLockModule = /** @class */ (function () {
        function NgxScrollLockModule() {
        }
        NgxScrollLockModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgxScrollLockComponent],
                        imports: [],
                        exports: [NgxScrollLockComponent]
                    },] }
        ];
        return NgxScrollLockModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxScrollLockComponent = NgxScrollLockComponent;
    exports.NgxScrollLockModule = NgxScrollLockModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-scroll-lock.umd.js.map