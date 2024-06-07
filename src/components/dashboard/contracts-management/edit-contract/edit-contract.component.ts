import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ContractService } from '../../../../services/contract.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';

@Component({
  selector: 'app-edit-contract',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeadingComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './edit-contract.component.html',
  styleUrl: './edit-contract.component.scss',
})
export class EditContractComponent implements OnInit {
  @Input() id: string | null = null;
  constructor(
    private contractService: ContractService,
    private fb: FormBuilder
  ) {}

  contractData: any = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Contract Form
  contractForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    commercial_number: ['', Validators.required],
    address: ['', Validators.required],
    indoor_cameras: ['', Validators.required],
    outdoor_cameras: ['', Validators.required],
    storage_device: ['', Validators.required],
    period_of_record: ['', Validators.required],
    show_screens: ['', Validators.required],
    camera_type: ['', Validators.required],
    price: ['', Validators.required],
    contract_date: ['', Validators.required],
    expiry_date: ['', Validators.required],
  });

  get name() {
    return this.contractForm.controls['name'];
  }
  get phone() {
    return this.contractForm.controls['phone'];
  }
  get email() {
    return this.contractForm.controls['email'];
  }
  get commercial_number() {
    return this.contractForm.controls['commercial_number'];
  }
  get address() {
    return this.contractForm.controls['address'];
  }
  get indoor_cameras() {
    return this.contractForm.controls['indoor_cameras'];
  }
  get outdoor_cameras() {
    return this.contractForm.controls['outdoor_cameras'];
  }
  get storage_device() {
    return this.contractForm.controls['storage_device'];
  }
  get period_of_record() {
    return this.contractForm.controls['period_of_record'];
  }
  get show_screens() {
    return this.contractForm.controls['show_screens'];
  }
  get camera_type() {
    return this.contractForm.controls['camera_type'];
  }
  get price() {
    return this.contractForm.controls['price'];
  }
  get contract_date() {
    return this.contractForm.controls['contract_date'];
  }
  get expiry_date() {
    return this.contractForm.controls['expiry_date'];
  }

  updateContract() {
    this.contractService
      .updateContract(this.id, this.contractForm.value)
      .subscribe({
        next: (res) => {
          this.successMessage = 'تم تعديل بيانات العقد بنجاح.';
          setTimeout(() => {
            this.successMessage = null;
          }, 7000);
        },
        error: (err) => {
          this.errorMessage =
            'تعذر تعديل بيانات العقد في الوقت الحالي، يرجى إعادة المحاولة مرة أخرى.';
          setTimeout(() => {
            this.errorMessage = null;
          }, 7000);
        },
      });
  }

  ngOnInit(): void {
    this.contractService.getContract(this.id).subscribe({
      next: (res: any) => {
        this.contractData = res;
        this.contractForm.patchValue(res);
      },
    });
  }
}
