import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { reducers, CustomSerializer, RouterEffects } from '@app/store';
import { ContactsEffects } from './contacts/store/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // not used in production
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';



// AOT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  const random = Math.floor(Math.random() * (999999 - 100000)) + 100000; // to prevent the browser to cache translation files
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json?v=' + random);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule,
    StoreModule.forRoot(reducers), // to initialize the root reducers
    EffectsModule.forRoot([RouterEffects]), // to initialize the root effects
    StoreRouterConnectingModule, // for Redux routing
    !environment.production ? StoreDevtoolsModule.instrument() : [], // for redux debugging on development only
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
