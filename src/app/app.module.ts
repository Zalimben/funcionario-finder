import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AppService } from './app.service';
import { PaginationComponent } from './pagination/pagination.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import localePy from '@angular/common/locales/es-PY';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localePy, 'es-PY');

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppService,
    {provide: LOCALE_ID, useValue: 'es-PY'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
