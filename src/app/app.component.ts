import { Component, OnInit } from '@angular/core';
import { ContactsService } from '@app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<div class="container"> <router-outlet></router-outlet> </div>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService,
    private contactsService: ContactsService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    const data = this.contactsService.getContacts();
    if (!(data && data.length > 0)) {
      this.contactsService.initializeKeys();
    }


  }

}
