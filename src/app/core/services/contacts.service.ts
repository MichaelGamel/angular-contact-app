import { Injectable } from '@angular/core';
import * as localStorageManager from '@michael-gamel/local-storage-manager';
import { CONTACTS_KEY, CONTACTS_METADATA_KEY } from '../defines';
import { IContact, IContactsMetaData } from '../interfaces';

@Injectable()
export class ContactsService {

    initializeKeys() {
        const initialMetadata = {
            sortBy: 'firstName',
            sortDirection: 'asc',
            filterKeyword: '',
        };
        localStorageManager.setItem(CONTACTS_KEY, []);
        localStorageManager.setItem(CONTACTS_METADATA_KEY, initialMetadata);
    }

    getContacts() {
        return this.getData();
    }

    getContactsMetadata() {
        return localStorageManager.getItem(CONTACTS_METADATA_KEY) as IContactsMetaData;
    }

    addContact(contact: IContact) {
        const contacts: Array<IContact> = this.getData();
        contacts.push(contact);
        localStorageManager.setItem(CONTACTS_KEY, contacts);
    }

    editContact(contact: IContact) {
        const contacts = this.getData();
        const index = contacts.findIndex(c => c.id === contact.id);
        contacts[index] = contact;
        localStorageManager.setItem(CONTACTS_KEY, contacts);
    }

    deleteContact(id: number) {
        const contacts: Array<IContact> = this.getData().filter(c => c.id !== id);
        localStorageManager.setItem(CONTACTS_KEY, contacts);
    }

    clearContact() {
        localStorageManager.empty();
    }


    saveMetadata(metadata) {
        localStorageManager.setItem(CONTACTS_METADATA_KEY, metadata);
    }

    private getData() {
        return localStorageManager.getItem(CONTACTS_KEY) as Array<IContact>;
    }
}
