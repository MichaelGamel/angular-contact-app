import { IContact } from '@app/core';
import * as fromActions from '../actions';


export interface IContactState {
    contacts: Array<IContact>;
    sortBy: string;
    sortDirection: string;
    filterKeyword: string;
}

const initialState: IContactState = {
    contacts: [],
    sortBy: 'firstName',
    sortDirection: 'asc',
    filterKeyword: ''
};



export function ContactReducer(state: IContactState = initialState, action: fromActions.ContactActions
): IContactState {

    switch (action.type) {

        case fromActions.LOAD_SUCCESS:
            return {
                ...state,
                contacts: action.payload as Array<IContact>
            };

        case fromActions.LOAD_METADATA_SUCCESS: {
            return {
                ...state,
                sortBy: action.payload.sortBy,
                sortDirection: action.payload.sortDirection,
                filterKeyword: action.payload.filterKeyword
            };
        }

        case fromActions.ADD:
            {
                const newContact = [...state.contacts, action.payload as IContact];
                return {
                    ...state,
                    contacts: newContact
                };
            }
        case fromActions.EDIT:
            {
                const newContacts = [...state.contacts];
                const updatedContacts = {
                    ...newContacts,
                    ...action.payload.contact
                };
                const contacts = [...state.contacts];
                contacts[action.payload.index] = updatedContacts;
                return {
                    ...state,
                    contacts: newContacts
                };
            }
        case fromActions.DELETE:
            {
                const newContacts = [...state.contacts].filter((c: IContact) => c.id !== action.payload);
                return {
                    ...state,
                    contacts: newContacts
                };
            }

        case fromActions.SORT:
            return {
                ...state,
                sortBy: action.payload.sortBy,
                sortDirection: action.payload.direction,
            };

        case fromActions.FILTER:
            return {
                ...state,
                filterKeyword: action.payload
            };


        default:
            return state;
    }

}

