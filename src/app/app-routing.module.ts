import { NotFoundComponent } from '@app/shared';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES_CONFIG } from '@app/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: PAGES_CONFIG.viewContacts.name,
    pathMatch: 'full'
  },
  {
    path: PAGES_CONFIG.viewContacts.name,
    loadChildren: './contacts/view/view.module#ViewModule',
  },
  {
    path: PAGES_CONFIG.manageContacts.name,
    loadChildren: './contacts/manage/manage.module#ManageModule',
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
