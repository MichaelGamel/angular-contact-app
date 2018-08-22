import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    ManageRoutingModule,
    SharedModule
  ],
  declarations: [ManageComponent]
})
export class ManageModule { }
