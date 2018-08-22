import { ContactsEffects } from '@app/contacts/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { SharedModule } from '@app/shared';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    EffectsModule.forFeature([ContactsEffects])
  ],
  declarations: [ViewComponent]
})
export class ViewModule { }
