import { ContactsService } from '@app/core';
import { Injectable } from '@angular/core';

import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';
import * as fromState from '../reducers';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

@Injectable()
export class ContactsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromState.IContactState>,
        private contactsService: ContactsService
    ) { }

    @Effect()
    loadContacts$ = this.actions$.pipe(ofType(fromActions.LOAD),
        map((action: fromActions.Load) => new fromActions.LoadSuccess(this.contactsService.getContacts())));

    @Effect({ dispatch: false })
    deleteContact$ = this.actions$.pipe(ofType(fromActions.DELETE),
        map((action: fromActions.Delete) => this.contactsService.deleteContact(action.payload)));

    @Effect({ dispatch: false })
    editContact$ = this.actions$.pipe(ofType(fromActions.EDIT),
        map((action: fromActions.Edit) => this.contactsService.editContact(action.payload)));

    @Effect({ dispatch: false })
    addContact$ = this.actions$.pipe(ofType(fromActions.ADD),
        map((action: fromActions.Add) => this.contactsService.addContact(action.payload)));

    @Effect({ dispatch: false })
    setContactsMetadata$ = this.actions$.pipe(ofType(fromActions.FILTER, fromActions.SORT),
        withLatestFrom(this.store.pipe(select(fromSelectors.getContactsMetedata))),
        map(([action, storeState]: [
            fromActions.Sort | fromActions.Filter,
            { sortBy: string, sortDirection: string, filterKeyword: string }
        ]) => this.contactsService.saveMetadata(storeState)));

    @Effect()
    loadContactsMetaData$ = this.actions$.pipe(ofType(fromActions.LOAD_METADATA),
        map((action: fromActions.LoadMetadataSuccess) => new fromActions.LoadMetadataSuccess(this.contactsService.getContactsMetadata())));

}
