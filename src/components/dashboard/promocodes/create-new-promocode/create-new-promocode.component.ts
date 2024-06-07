import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../../../../services/dashboard.service';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';

@Component({
  selector: 'app-create-new-promocode',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    SuccessMessageComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './create-new-promocode.component.html',
  styleUrl: './create-new-promocode.component.scss',
})
export class CreateNewPromocodeComponent {
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  icons = {
    delete: faTrash,
  };

  promocodeForm = this.fb.group({
    promocode: ['', Validators.required],
    discount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    start_date: ['', Validators.required],
    expiry_date: ['', Validators.required],
  });

  get promocode() {
    return this.promocodeForm.controls['promocode'];
  }
  get discount() {
    return this.promocodeForm.controls['discount'];
  }
  get start_date() {
    return this.promocodeForm.controls['start_date'];
  }
  get expiry_date() {
    return this.promocodeForm.controls['expiry_date'];
  }

  successMessage: string | null = null;
  errorMessage: string | null = null;

  addPromocode() {
    this.promocodeForm.markAllAsTouched();

    this.dashboardService.addPromocode(this.promocodeForm.value).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (err) => {
        this.errorMessage =
          'تعذر إضافة كود الخصم في الوقت الحالي، يرجى إعادة المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }
}
