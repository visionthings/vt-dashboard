import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-profit-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './profit-chart.component.html',
  styleUrl: './profit-chart.component.scss',
})
export class ProfitChartComponent implements OnInit {
  @ViewChild('chart') chart: any;

  constructor(private dashboardService: DashboardService) {}

  chartOptions: any = {};

  contracts: any = [];
  prices: any = [];
  dates: any = [];

  ngOnInit(): void {
    this.dashboardService.getContracts().subscribe({
      next: (res: any) => {
        this.contracts = res;

        for (let i of res) {
          this.prices.push(i.price);
          this.dates.push(i.created_at.slice(0, 10));
        }
      },
      complete: () => {
        this.chartOptions = {
          series: [
            {
              name: 'قيمة العقد',
              data: this.prices,
            },
          ],
          chart: {
            type: 'area',
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
          },

          title: {
            text: 'Fundamental Analysis of Stocks',
            align: 'left',
          },
          subtitle: {
            text: 'Price Movements',
            align: 'left',
          },
          labels: this.dates,
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: 'left',
          },
        };
      },
    });
  }
}
