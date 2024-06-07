import { OnChanges, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faFileInvoice,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../../services/dashboard.service';
import ApexCharts from 'apexcharts';
import { Component, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { OverviewComponent } from './overview/overview.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ContractsReportComponent } from './contracts-report/contracts-report.component';
import { RequestsReportComponent } from './requests-report/requests-report.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgApexchartsModule,
    OverviewComponent,
    RevenueComponent,
    ContractsReportComponent,
    RequestsReportComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('chart') chart: any;
  constructor(private dashboardService: DashboardService) {}
}
