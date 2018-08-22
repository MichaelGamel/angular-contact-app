import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '@app/store';
import * as fromContacts from '@app/contacts/store';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IContact, PAGES_CONFIG, ContactsService } from '@app/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  /** list of contacts */
  public contacts: Observable<Array<IContact>>;

  /** flag to know if there's data exists or not  */
  public isDataExists: Observable<boolean>;

  /** to hold any subscription to destroy it with component subscription */
  public subscription: Subscription;

  /** variable to hold all form data */
  public form: FormGroup;

  /** sorting metadata */
  public contactMetaData = [
    { propertyName: 'firstName', sortDirection: 'asc' },
    { propertyName: 'lastName', sortDirection: 'asc' },
    { propertyName: 'email', sortDirection: 'asc' }
  ];

  constructor(private store: Store<fromStore.IAppState>,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.store.dispatch(new fromContacts.Load());
    this.store.dispatch(new fromContacts.LoadMetadata());
    this.form = this.formBuilder.group({
      filterKeywordField: ''
    });

    this.contacts = this.store.pipe(select(fromContacts.getContacts));
    this.isDataExists = this.store.pipe(select(fromContacts.isContactsDataExists));
    this.subscription = this.store.pipe(select(fromContacts.getFilterKeyword)).subscribe((keyword: string) => {
      this.form.get('filterKeywordField').setValue(keyword);
    });
  }

  /** navigate to manage page to create new contact */
  navigate() {
    this.store.dispatch(new fromStore.Go({ path: [PAGES_CONFIG.manageContacts.route] }));
  }

  /**
   * navigate to manage page to edit existing contact
   * @param id contact id
   */
  edit(id: number) {
    this.store.dispatch(new fromStore.Go({ path: [PAGES_CONFIG.manageContacts.route], query: { id } }));
  }

  /** sort by click on column header */
  sort(propertyName: string) {
    const data = this.contactMetaData.find(x => x.propertyName === propertyName);
    data.sortDirection = (data.sortDirection === 'asc') ? 'desc' : 'asc';
    this.store.dispatch(new fromContacts.Sort({ sortBy: propertyName, direction: data.sortDirection }));
  }

  /** filter by first name or last name */
  onKeyUp(keyword: string) {
    this.store.dispatch(new fromContacts.Filter(keyword));
  }

  /** delete contact */
  delete(id: number) {
    this.store.dispatch(new fromContacts.Delete(id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
