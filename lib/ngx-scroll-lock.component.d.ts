import { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
export declare class NgxScrollLockComponent implements OnInit, OnDestroy, OnChanges {
    target: string;
    lock: boolean;
    private _targetElement;
    private _listenerOptions;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    disableLock(target: HTMLElement): void;
    enableLock(target: HTMLElement): void;
    isTouchDevice(): number | boolean;
    preventTouchMove(rawEvent: TouchEvent): boolean;
}
