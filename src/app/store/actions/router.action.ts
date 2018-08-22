import { Action } from '@ngrx/store';
import { STORE_KEYS } from '@app/core';
import { NavigationExtras } from '@angular/router';

export const GO = `[${STORE_KEYS.MODULES.ROUTING}] GO`;
export const BACK = `[${STORE_KEYS.MODULES.ROUTING}] Back`;
export const FORWARD = `[${STORE_KEYS.MODULES.ROUTING}] Forward`;


export class Go implements Action {
    readonly type = GO;
    constructor(
        public payload: {
            path: any[];
            query?: object;
            extras?: NavigationExtras;
        }
    ) { }
}

export class Back implements Action {
    readonly type = BACK;
}

export class Forward implements Action {
    readonly type = FORWARD;
}


export type Actions = Go | Back | Forward;
