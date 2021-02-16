import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule }        from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    BreadcrumbComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    RouterModule
  ]
})
export class SharedModule { }
