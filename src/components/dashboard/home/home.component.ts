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
import { ProfitChartComponent } from './profit-chart/profit-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, NgApexchartsModule, ProfitChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: any;
  constructor(private dashboardService: DashboardService) {}

  cards = [
    { id: 1, title: 'عدد زيارات الموقع', icon: faEye, data: 0 },
    { id: 2, title: 'إجمالي الإيرادات', icon: faSackDollar, data: 0 },
    {
      id: 3,
      title: 'عدد العقود المصدرة',
      icon: faFileInvoice,
      data: 0,
    },
  ];

  usersCount: number = 0;
  chartOptions: any = {};

  ngOnInit(): void {
    this.dashboardService.getVisitsCount().subscribe({
      next: (res: any) => {
        this.cards[0].data = res;
      },
    });

    this.dashboardService.getContractsSales().subscribe({
      next: (res: any) => {
        this.cards[1].data = res;
      },
    });

    this.dashboardService.getContractsCount().subscribe({
      next: (res: any) => {
        this.cards[2].data = res;
      },
    });

    this.dashboardService.getUsersCount().subscribe({
      next: (res: any) => {
        this.usersCount = res;
      },
      complete: () => {
        this.chartOptions = {
          series: [this.cards[0].data, this.usersCount],
          labels: ['عدد الزيارات', 'عدد الأعضاء'],
          chart: {
            width: 300,
            type: 'donut',
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            type: 'gradient',
          },
          legend: {
            formatter: function (val: any, opts: any) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        };
      },
    });
  }
  ngOnChanges(): void {
    this.dashboardService.getVisitsCount().subscribe({
      next: (res: any) => {
        this.cards[0].data = res;
      },
    });

    this.dashboardService.getContractsSales().subscribe({
      next: (res: any) => {
        this.cards[1].data = res;
      },
    });

    this.dashboardService.getContractsCount().subscribe({
      next: (res: any) => {
        this.cards[2].data = res;
      },
    });

    this.dashboardService.getUsersCount().subscribe({
      next: (res: any) => {
        this.usersCount = res;
      },
      complete: () => {
        this.chartOptions = {
          series: [this.cards[0].data, this.usersCount],
          labels: ['عدد الزيارات', 'عدد الأعضاء'],
          chart: {
            width: 300,
            type: 'donut',
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            type: 'gradient',
          },
          legend: {
            formatter: function (val: any, opts: any) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        };
      },
    });
  }
}
