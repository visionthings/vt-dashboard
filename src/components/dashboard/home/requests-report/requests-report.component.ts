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
import { StatsService } from '../../../../services/stats.service';

@Component({
  selector: 'app-requests-report',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './requests-report.component.html',
  styleUrl: './requests-report.component.scss',
})
export class RequestsReportComponent implements OnInit {
  @ViewChild('chart') chart: any;
  constructor(private statsService: StatsService) {}
  chartOptions: any = null;
  ngOnInit(): void {
    this.statsService.contracts().subscribe({
      next: (res: any) => {
        this.chartOptions = {
          series: [
            {
              name: 'الإيرادات ',
              data: Object.values(res),
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

          labels: Object.keys(res),
          xaxis: {},
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
