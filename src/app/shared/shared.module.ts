import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ReactiveFormsModule }     from '@angular/forms';
import { BreadcrumbComponent }     from './components/breadcrumb/breadcrumb.component';
import { RouterModule }            from '@angular/router';
import { HeaderComponent }         from './components/header/header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    BreadcrumbComponent,
    HeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbComponent,
    HeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
  ],
})
export class SharedModule {
}
