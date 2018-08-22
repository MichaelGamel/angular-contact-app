import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextboxComponent } from './components/textbox/textbox.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/** components list */
const components = [
    TextboxComponent,
    NotFoundComponent
];

/** modules list */
const modules = [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TooltipModule.forRoot(),
        ...modules
    ],
    declarations: [...components],
    exports: [...components, ...modules, TooltipModule]
})
export class SharedModule { }
