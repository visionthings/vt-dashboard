import { Component } from '@angular/core';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-create-new-mail',
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    ReactiveFormsModule,
    SuccessMessageComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './create-new-mail.component.html',
  styleUrl: './create-new-mail.component.scss',
})
export class CreateNewMailComponent {
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  mailForm = this.fb.group({
    to: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  get to() {
    return this.mailForm.controls['to'];
  }
  get subject() {
    return this.mailForm.controls['subject'];
  }
  get message() {
    return this.mailForm.controls['message'];
  }

  submit() {
    this.mailForm.markAllAsTouched();
    this.isLoading = true;
    this.dashboardService.sendMail(this.mailForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.mailForm.reset();
        this.successMessage = res.message;
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage =
          'تعذر الإرسال في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
}
