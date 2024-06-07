import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { EmptyStateComponent } from '../../../../shared/empty-state/empty-state.component';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faBan } from '@fortawesome/free-solid-svg-icons';
import { MembershipService } from '../../../../services/membership.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    SuccessMessageComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
    LoadingComponent,
    PaginationComponent,
    HeadingComponent,
    FontAwesomeModule,
    EmptyStateComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements OnInit {
  constructor(
    private membershipService: MembershipService,
    private fb: FormBuilder
  ) {}
  icons = {
    delete: faTrashCan,
    block: faBan,
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  res: any = [];
  users: any = [];
  currentPage: string | null = null;
  isLoading: boolean = true;

  // Set Page
  setPage(page: any) {
    if (page) {
      this.currentPage = page;
      this.membershipService.getPage(page).subscribe({
        next: (res: any) => {
          this.res = res;
          this.users = res.data;
        },
        error: () => {},
      });
    }
  }

  // Block User
  block(id: string) {
    this.membershipService.blockMember(id).subscribe({
      next: (res) => {
        this.successMessage = 'تم حظر العضو بنجاح.';
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (error) => {
        this.errorMessage =
          'تعذر حظر العضو في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  // Delete User
  delete(id: string) {
    this.membershipService.deleteMember(id).subscribe({
      next: (res) => {
        this.successMessage = 'تم حذف العضو بنجاح.';
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (error) => {
        this.errorMessage =
          'تعذر حذف العضو في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  // Search Form
  searchForm = this.fb.group({
    user: ['', Validators.required],
  });

  get contract_number() {
    return this.searchForm.controls['user'];
  }

  search() {
    const username = this.searchForm.controls.user.value;
    this.membershipService.searchMembers(username).subscribe({
      next: (res: any) => {
        console.log(res);

        this.users = res;
      },
    });
  }

  ngOnInit(): void {
    this.membershipService.getMembers().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.res = res;
        this.users = res.data;
        this.currentPage = `${res.path}?page=1`;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          'تعذر الاتصال بقاعدة البيانات في الوقت الحالي، يرجى إعادة المحاولة مرة أخرى.';

        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }
}
