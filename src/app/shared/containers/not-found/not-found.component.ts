import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<h1 class="title">
              {{ 'page-not-found' | translate }}
             </h1>`,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

}
