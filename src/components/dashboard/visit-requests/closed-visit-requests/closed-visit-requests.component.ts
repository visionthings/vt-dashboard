import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardService } from '../../../../services/dashboard.service';
import { EmptyStateComponent } from '../../../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-closed-visit-requests',
  standalone: true,
  imports: [
    LoadingComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    HeadingComponent,
    PaginationComponent,
    FontAwesomeModule,
    EmptyStateComponent,
  ],
  templateUrl: './closed-visit-requests.component.html',
  styleUrl: './closed-visit-requests.component.scss',
})
export class ClosedVisitRequestsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  isLoading: boolean = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  res: any = [];
  requests: any = [];
  currentPage: string = '';

  closeTicket(id: string) {
    this.dashboardService.closeTicket(id).subscribe({
      next: (res) => {
        this.successMessage = 'تم غلق الطلب بنجاح.';
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (err) => {
        this.errorMessage =
          'تعذر حذف الطلب في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  delete(id: string) {
    this.dashboardService.deleteVisitRequest(id).subscribe({
      next: (res) => {
        this.successMessage = 'تم حذف الطلب بنجاح.';
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (error) => {
        this.errorMessage =
          'تعذر حذف الطلب في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  setPage(page: any) {
    if (page) {
      this.currentPage = page;
      this.dashboardService.getPage(page).subscribe({
        next: (res: any) => {
          this.res = res;
          this.requests = res.data;
        },
        error: () => {},
      });
    }
  }
  ngOnInit(): void {
    this.dashboardService.closedVisitRequests().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.res = res;
        this.requests = res.data;
        this.currentPage = `${res.path}?page=1`;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          'تعذر الاتصال بقاعدة البيانات في الوقت الحالي، يرجى المحاولة مرة أخرى.';
      },
    });
  }
}
