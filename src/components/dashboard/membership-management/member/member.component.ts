import { Component, Input, OnInit } from '@angular/core';
import { MembershipService } from '../../../../services/membership.service';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { EmptyStateComponent } from '../../../../shared/empty-state/empty-state.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    LoadingComponent,
    ReactiveFormsModule,
    SuccessMessageComponent,
    ErrorMessageComponent,
    HeadingComponent,
    EmptyStateComponent,
    CommonModule,
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
})
export class MemberComponent implements OnInit {
  @Input() id: string = '';
  constructor(
    private memberService: MembershipService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  user: any = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // User Form
  userForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    email_verified_at: ['', Validators.required],
  });

  updateUser() {
    this.memberService
      .updateMember(this.user.id, this.userForm.value)
      .subscribe({
        next: () => {
          this.successMessage = 'تم تعديل بيانات العضو بنجاح.';
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error: () => {
          this.errorMessage =
            'تعذر تعديل بيانات العضو في الوقت الحالي، برجاء إعادة المحاولة مرة أخرى.';
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        },
      });
  }

  // Contracts
  editContract(id: string) {
    this.router.navigateByUrl(`/dashboard/edit-contract/${id}`);
  }

  // Companies Form

  ngOnInit(): void {
    this.memberService.showMember(this.id).subscribe({
      next: (res) => {
        this.user = res;
        console.log(res);
        this.userForm.patchValue(res);
      },
    });
  }
}
