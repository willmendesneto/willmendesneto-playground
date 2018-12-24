/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation, } from '@angular/core';
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
        var e = rawEvent || tslib_1.__assign({}, window.event, { touches: [] });
        // // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom)
        if (e.touches && e.touches.length > 1)
            return true;
        if (e.preventDefault)
            e.preventDefault();
        return false;
    };
    NgxScrollLockComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-scroll-lock',
                    template: "\n    <style>\n      .ngx-scroll-lock {\n        box-sizing: border-box !important;\n        overflow: hidden !important;\n        position: inherit !important;\n      }\n    </style>\n    <ng-content></ng-content>\n  ",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    NgxScrollLockComponent.propDecorators = {
        target: [{ type: Input }],
        lock: [{ type: Input }]
    };
    return NgxScrollLockComponent;
}());
export { NgxScrollLockComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNjcm9sbC1sb2NrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1zY3JvbGwtbG9jay8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtc2Nyb2xsLWxvY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFHVCxLQUFLLEVBR0wsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCO0lBQUE7UUFnQkUsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdaLFNBQUksR0FBRyxLQUFLLENBQUM7UUFJTCxxQkFBZ0IsR0FBRztZQUN6QixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztJQTZFSixDQUFDOzs7O0lBM0VDLHlDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU07WUFDL0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUVsQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7Ozs7SUFFRCw0Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELDRDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUNFLE9BQU8sQ0FBQyxNQUFNO1lBQ2QsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVc7WUFDM0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQzVEO1lBQ0EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTTtnQkFDL0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDckMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0Y7UUFDRCxJQUNFLE9BQU8sQ0FBQyxJQUFJO1lBQ1osQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQ3hEO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZO2dCQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDOzs7OztJQUVELDRDQUFXOzs7O0lBQVgsVUFBWSxNQUFtQjtRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVyRCxzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FDbEMsV0FBVyxFQUNYLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUN0QixDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCwyQ0FBVTs7OztJQUFWLFVBQVcsTUFBbUI7UUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FDckMsV0FBVyxFQUNYLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUN0QixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELDhDQUFhOzs7SUFBYjtRQUNFLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzNELE9BQU8sY0FBYyxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRUQsaURBQWdCOzs7O0lBQWhCLFVBQWlCLFFBQW9COztZQUM3QixDQUFDLEdBQUcsUUFBUSx5QkFBUyxNQUFNLENBQUMsS0FBSyxJQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUU7UUFFdEQsNEhBQTRIO1FBQzVILElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFbkQsSUFBSSxDQUFDLENBQUMsY0FBYztZQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV6QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQXRHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLDROQVNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs7O3lCQUVFLEtBQUs7dUJBR0wsS0FBSzs7SUFxRlIsNkJBQUM7Q0FBQSxBQXZHRCxJQXVHQztTQXpGWSxzQkFBc0I7OztJQUNqQyx3Q0FDWTs7SUFFWixzQ0FDYTs7Ozs7SUFFYixnREFBb0M7Ozs7O0lBRXBDLGtEQUdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc2Nyb2xsLWxvY2snLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdHlsZT5cbiAgICAgIC5uZ3gtc2Nyb2xsLWxvY2sge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94ICFpbXBvcnRhbnQ7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgICAgICAgcG9zaXRpb246IGluaGVyaXQgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4U2Nyb2xsTG9ja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICB0YXJnZXQgPSAnJztcblxuICBASW5wdXQoKVxuICBsb2NrID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBfbGlzdGVuZXJPcHRpb25zID0ge1xuICAgIGNhcHR1cmU6IGZhbHNlLFxuICAgIHBhc3NpdmU6IGZhbHNlLFxuICB9O1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3RhcmdldEVsZW1lbnQgPSB0aGlzLnRhcmdldFxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudGFyZ2V0KVxuICAgICAgOiBkb2N1bWVudC5ib2R5O1xuXG4gICAgaWYgKHRoaXMubG9jaykge1xuICAgICAgdGhpcy5kaXNhYmxlTG9jayh0aGlzLl90YXJnZXRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmVuYWJsZUxvY2sodGhpcy5fdGFyZ2V0RWxlbWVudCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy50YXJnZXQgJiZcbiAgICAgICFjaGFuZ2VzLnRhcmdldC5maXJzdENoYW5nZSAmJlxuICAgICAgY2hhbmdlcy50YXJnZXQucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlcy50YXJnZXQuY3VycmVudFZhbHVlXG4gICAgKSB7XG4gICAgICB0aGlzLmVuYWJsZUxvY2sodGhpcy5fdGFyZ2V0RWxlbWVudCk7XG4gICAgICB0aGlzLl90YXJnZXRFbGVtZW50ID0gdGhpcy50YXJnZXRcbiAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudGFyZ2V0KVxuICAgICAgICA6IGRvY3VtZW50LmJvZHk7XG4gICAgICBpZiAodGhpcy5sb2NrKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZUxvY2sodGhpcy5fdGFyZ2V0RWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMubG9jayAmJlxuICAgICAgIWNoYW5nZXMubG9jay5maXJzdENoYW5nZSAmJlxuICAgICAgY2hhbmdlcy5sb2NrLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXMubG9jay5jdXJyZW50VmFsdWVcbiAgICApIHtcbiAgICAgIGNoYW5nZXMubG9jay5jdXJyZW50VmFsdWVcbiAgICAgICAgPyB0aGlzLmRpc2FibGVMb2NrKHRoaXMuX3RhcmdldEVsZW1lbnQpXG4gICAgICAgIDogdGhpcy5lbmFibGVMb2NrKHRoaXMuX3RhcmdldEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVMb2NrKHRhcmdldDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLl90YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ25neC1zY3JvbGwtbG9jaycpO1xuXG4gICAgLy8gTW9iaWxlIFNhZmFyaSBpZ25vcmVzIHsgb3ZlcmZsb3c6IGhpZGRlbiB9IGRlY2xhcmF0aW9uIG9uIHRoZSBib2R5LlxuICAgIHRoaXMuX3RhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICd0b3VjaG1vdmUnLFxuICAgICAgdGhpcy5wcmV2ZW50VG91Y2hNb3ZlLFxuICAgICAgdGhpcy5fbGlzdGVuZXJPcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIGVuYWJsZUxvY2sodGFyZ2V0OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuX3RhcmdldEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbmd4LXNjcm9sbC1sb2NrJyk7XG5cbiAgICB0aGlzLl90YXJnZXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAndG91Y2htb3ZlJyxcbiAgICAgIHRoaXMucHJldmVudFRvdWNoTW92ZSxcbiAgICAgIHRoaXMuX2xpc3RlbmVyT3B0aW9uc1xuICAgICk7XG4gIH1cblxuICBpc1RvdWNoRGV2aWNlKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhd2luZG93KSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7XG4gIH1cblxuICBwcmV2ZW50VG91Y2hNb3ZlKHJhd0V2ZW50OiBUb3VjaEV2ZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3QgZSA9IHJhd0V2ZW50IHx8IHsgLi4ud2luZG93LmV2ZW50LCB0b3VjaGVzOiBbXSB9O1xuXG4gICAgLy8gLy8gRG8gbm90IHByZXZlbnQgaWYgdGhlIGV2ZW50IGhhcyBtb3JlIHRoYW4gb25lIHRvdWNoICh1c3VhbGx5IG1lYW5pbmcgdGhpcyBpcyBhIG11bHRpIHRvdWNoIGdlc3R1cmUgbGlrZSBwaW5jaCB0byB6b29tKVxuICAgIGlmIChlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA+IDEpIHJldHVybiB0cnVlO1xuXG4gICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19