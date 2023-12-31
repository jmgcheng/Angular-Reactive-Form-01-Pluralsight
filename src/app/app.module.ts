import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
/*
  Template Driven VS ReactiveForm (FormGroup + FormControl)
    Template Driven
      FormsModule 
    ReactiveForm (FormGroup + FormControl)
      ReactiveFormsModule
*/ 


import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }