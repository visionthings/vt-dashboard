import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-visit-requests',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './visit-requests.component.html',
  styleUrl: './visit-requests.component.scss',
})
export class VisitRequestsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  icons = {
    complete: faCheck,
  };

  visitRequests: any = undefined;
  isVisitRequestsLoaded: boolean = false;

  deleteVisitRequest(requestId: string) {
    this.dashboardService.deleteVisitRequest(requestId).subscribe({
      next: () => {
        this.dashboardService.getVisitRequests().subscribe({
          next: (res) => {
            console.log(res);
            this.visitRequests = res;
          },
        });
      },
    });
  }

  ngOnInit(): void {
    this.dashboardService.getVisitRequests().subscribe({
      next: (res) => {
        console.log(res);
        this.visitRequests = res;
      },
      complete: () => {
        this.isVisitRequestsLoaded = true;
      },
    });
  }
}
