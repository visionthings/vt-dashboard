import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardService } from '../../../services/dashboard.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-promocodes',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './promocodes.component.html',
  styleUrl: './promocodes.component.scss',
})
export class PromocodesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  icons = {
    delete: faTrash,
  };

  promocodeForm = this.fb.group({
    promocode: ['', Validators.required],
    discount: ['', Validators.required],
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

  addPromocode() {
    this.promocodeForm.markAllAsTouched();

    this.dashboardService.addPromocode(this.promocodeForm.value).subscribe({
      next: (res: any) => {
        this.dashboardService.getPromocodes().subscribe({
          next: (res) => {
            this.promocodes = res;
          },
          complete: () => {
            this.isPromocodesLoaded = true;
          },
        });
        this.successMessage = res.message;

        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
    });
  }

  promocodes: any = undefined;
  isPromocodesLoaded: boolean = false;

  deletePromocode(promocodeID: string) {
    this.dashboardService.deletePromocode(promocodeID).subscribe({
      next: () => {
        this.dashboardService.getPromocodes().subscribe({
          next: (res) => {
            this.promocodes = res;
          },
        });
      },
    });
  }

  ngOnInit(): void {
    this.dashboardService.getPromocodes().subscribe({
      next: (res) => {
        this.promocodes = res;
      },
      complete: () => {
        this.isPromocodesLoaded = true;
      },
    });
  }
}
