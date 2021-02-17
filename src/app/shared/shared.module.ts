import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ReactiveFormsModule }     from '@angular/forms';
import { BreadcrumbComponent }     from './components/breadcrumb/breadcrumb.component';
import { RouterModule }            from '@angular/router';
import { HeaderComponent }         from './components/header/header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

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
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbComponent,
    HeaderComponent,
    FormFieldErrorComponent,
  ],
})
export class SharedModule {
}
