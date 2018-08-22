import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '@app/store';
import * as fromContacts from '@app/contacts/store';
import { PAGES_CONFIG } from '@app/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  /** hold the next id when we add new contact */
  public nextId: number;

  /** hold the editable contact id */
  public editId: number;

  /** to hold any subscription to destroy it with component subscription */
  public subscription: Subscription;

  /** to hold page title in (add/edit) mode */
  public pageTitle: string;

  /** variable to hold all form data */
  public form: FormGroup;

  constructor(private store: Store<fromStore.IAppState>,
    private formBuilder: FormBuilder,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.pageTitle = this.translateService.instant('add-new-contact');
    this.form = this.formBuilder.group({
      firstNameField: '',
      lastNameField: '',
      phoneField: '',
      emailField: ''
    });

    this.subscription = this.store.pipe(select(fromStore.getRoutingState), flatMap((result: any) => {
      this.editId = (result.queryParams.id) ? +result.queryParams.id : -1;
      return this.store.pipe(select(fromContacts.getContactById(this.editId)));
    })).subscribe(data => {
      if (data) {
        this.form.get('firstNameField').setValue(data.firstName);
        this.form.get('lastNameField').setValue(data.lastName);
        this.form.get('phoneField').setValue(data.phone);
        this.form.get('emailField').setValue(data.email);
        this.pageTitle = this.translateService.instant('edit-contact');
      }
    });

    this.store.pipe(select(fromContacts.getNextContactId)).subscribe(result => {
      this.nextId = result;
    });
  }

  /**
   * form submission in edit mode or add mode
   * @param formValues
   */
  save(formValues) {
    if (this.editId !== -1) {

      // Edit Mode
      this.store.dispatch(new fromContacts.Edit({
        id: this.editId, firstName: formValues.firstNameField, lastName: formValues.lastNameField, phone: formValues.phoneField, email: formValues.emailField
      }));

    } else {

      // Add Mode
      this.store.dispatch(new fromContacts.Add({
        id: this.nextId, firstName: formValues.firstNameField, lastName: formValues.lastNameField, phone: formValues.phoneField, email: formValues.emailField
      }));
    }

    this.store.dispatch(new fromStore.Go({ path: [PAGES_CONFIG.viewContacts.route] }));
  }

  /**
   * to cancel the operation and back to view page
   */
  cancel() {
    this.store.dispatch(new fromStore.Go({ path: [PAGES_CONFIG.viewContacts.route] }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
