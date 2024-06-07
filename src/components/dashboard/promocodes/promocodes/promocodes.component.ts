import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { EmptyStateComponent } from '../../../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-promocodes',
  standalone: true,
  imports: [
    HeadingComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    PaginationComponent,
    LoadingComponent,
    FontAwesomeModule,
    EmptyStateComponent,
  ],
  templateUrl: './promocodes.component.html',
  styleUrl: './promocodes.component.scss',
})
export class PromocodesComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}
  icons = {
    delete: faTrashCan,
  };
  isLoading = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  promocodes: any = null;
  currentPage: string | null = null;
  res: any = [];

  setPage(page: any) {
    if (page) {
      this.currentPage = page;
      this.dashboardService.getPromocodesPage(page).subscribe({
        next: (res: any) => {
          this.res = res;
          this.promocodes = res.data;
        },
        error: () => {},
      });
    }
  }

  delete(id: string) {
    this.dashboardService.deletePromocode(id).subscribe({
      next: (res) => {
        this.successMessage = 'تم الحذف بنجاح.';
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (error) => {
        this.errorMessage =
          'تعذر الحذف في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }
  ngOnInit(): void {
    this.dashboardService.getPromocodes().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.promocodes = res.data;
        this.res = res;
        this.currentPage = `${res.path}?page=1`;
      },
    });
  }
}
