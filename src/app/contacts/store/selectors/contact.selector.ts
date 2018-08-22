import { IContact } from '@app/core';
import { IAppState } from '@app/store';
import { createSelector } from '@ngrx/store';
import * as fromContacts from '../reducers';


export const selectFeature = (state: IAppState) => state.contactState;

export const getContacts = createSelector(
    selectFeature,
    (state: fromContacts.IContactState) => {
        if (state.filterKeyword === '') {
            return state.contacts.sort(compare(state.sortBy, state.sortDirection));
        } else {
            return state.contacts.sort(compare(state.sortBy, state.sortDirection)).filter((c: IContact) => {
                return c.firstName.toUpperCase().startsWith(state.filterKeyword.toUpperCase()) ||
                    c.lastName.toUpperCase().startsWith(state.filterKeyword.toUpperCase());
            });
        }
    }
);

const compare = (propertyName: string, direction: string) => (a, b) => {
    // Use toUpperCase() to ignore character casing
    const contactA = a[propertyName].toUpperCase();
    const contactB = b[propertyName].toUpperCase();

    let comparison = 0;
    if (contactA > contactB) {
        comparison = 1;
    } else if (contactA < contactB) {
        comparison = -1;
    }

    return (
        (direction === 'desc') ? (comparison * -1) : comparison
    );

};

export const getNextContactId = createSelector(
    selectFeature,
    (state: fromContacts.IContactState) => {
        if (state.contacts.length > 0) {
            return Math.max(...state.contacts.map(c => c.id)) + 1;
        } else {
            return 1;
        }
    }
);

export const isContactsDataExists = createSelector(
    selectFeature,
    (state: fromContacts.IContactState) => state.contacts.length > 0
);

export const getContactById = (contactId: number) => createSelector(
    selectFeature,
    (state: fromContacts.IContactState) => state.contacts.find(c => c.id === contactId)
);

export const getContactsMetedata = createSelector(
    selectFeature,
    (state: fromContacts.IContactState) => ({ sortBy: state.sortBy, sortDirection: state.sortDirection, filterKeyword: state.filterKeyword })
);


export const getFilterKeyword = createSelector(
    selectFeature,
    (state: fromContacts.IContactState) => state.filterKeyword
);
