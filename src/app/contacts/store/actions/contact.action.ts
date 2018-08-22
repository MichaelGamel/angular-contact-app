import { IContact } from '@app/core';
import { Action } from '@ngrx/store';
import { STORE_KEYS, IContactsMetaData } from '@app/core';


export const LOAD = `[${STORE_KEYS.MODULES.CONTACTS}] LOAD`;
export const LOAD_SUCCESS = `[${STORE_KEYS.MODULES.CONTACTS}] LOAD_SUCCESS`;

export const LOAD_METADATA = `[${STORE_KEYS.MODULES.CONTACTS}] LOAD_METADATA`;
export const LOAD_METADATA_SUCCESS = `[${STORE_KEYS.MODULES.CONTACTS}] LOAD_METADATA_SUCCESS`;

export const ADD = `[${STORE_KEYS.MODULES.CONTACTS}] ADD`;

export const EDIT = `[${STORE_KEYS.MODULES.CONTACTS}] EDIT`;

export const DELETE = `[${STORE_KEYS.MODULES.CONTACTS}] DELETE`;

export const SORT = `[${STORE_KEYS.MODULES.CONTACTS}] SORT`;

export const FILTER = `[${STORE_KEYS.MODULES.CONTACTS}] FILTER`;

export class Load implements Action {
    readonly type = LOAD;
    constructor(public payload?: any) { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: Array<IContact>) { }
}

export class LoadMetadata implements Action {
    readonly type = LOAD_METADATA;
    constructor(public payload?: any) { }
}

export class LoadMetadataSuccess implements Action {
    readonly type = LOAD_METADATA_SUCCESS;
    constructor(public payload: IContactsMetaData) { }
}

export class Add implements Action {
    readonly type = ADD;
    constructor(public payload?: any) { }
}

export class Edit implements Action {
    readonly type = EDIT;
    constructor(public payload?: any) { }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public payload?: any) { }
}


export class Sort implements Action {
    readonly type = SORT;
    constructor(public payload: { sortBy: string, direction: string }) { }
}

export class Filter implements Action {
    readonly type = FILTER;
    constructor(public payload: string) { }
}

export type ContactActions =
    | Load
    | LoadSuccess
    | Add
    | Edit
    | Delete
    | Sort
    | Filter;
