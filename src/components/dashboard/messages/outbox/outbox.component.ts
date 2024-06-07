import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { faTrashCan, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { EmptyStateComponent } from '../../../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-outbox',
  standalone: true,
  imports: [
    SuccessMessageComponent,
    ErrorMessageComponent,
    HeadingComponent,
    FontAwesomeModule,
    LoadingComponent,
    PaginationComponent,
    EmptyStateComponent,
  ],
  templateUrl: './outbox.component.html',
  styleUrl: './outbox.component.scss',
})
export class OutboxComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  icons = {
    read: faGlasses,
    delete: faTrashCan,
  };
  isLoading = true;
  messages: any[] = [];
  res: any = [];
  currentMessage: string | null = null;
  currentPage: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  setPage(page: any) {
    if (page) {
      this.currentPage = page;
      this.dashboardService.getOutboxPage(page).subscribe({
        next: (res: any) => {
          this.res = res;
          this.messages = res.data;
        },
        error: () => {},
      });
    }
  }

  read(message: string) {
    this.currentMessage = message;
  }

  delete(id: string) {
    this.dashboardService.deleteFromOutbox(id).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (error) => {
        this.errorMessage =
          'تعذر حذف الرسالة في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  ngOnInit(): void {
    this.dashboardService.getOutbox().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.res = res;
        this.messages = res.data;
        this.currentPage = `${res.path}?page=1`;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
