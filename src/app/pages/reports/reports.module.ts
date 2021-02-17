import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent }     from './reports/reports.component';
import { SharedModule }         from '../../shared/shared.module';
import { ChartModule }          from 'primeng/chart';

@NgModule({
  imports: [
    SharedModule,
    ReportsRoutingModule,
    ChartModule,
  ],
  declarations: [ReportsComponent],
})
export class ReportsModule {
}
