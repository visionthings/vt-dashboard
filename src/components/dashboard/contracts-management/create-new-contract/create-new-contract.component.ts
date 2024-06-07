import { Component } from '@angular/core';
import { ContractService } from '../../../../services/contract.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ContractPdfComponent } from '../../contract-pdf/contract-pdf.component';
@Component({
  selector: 'app-create-new-contract',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    HeadingComponent,
    ContractPdfComponent,
  ],
  templateUrl: './create-new-contract.component.html',
  styleUrl: './create-new-contract.component.scss',
})
export class CreateNewContractComponent {
  constructor(
    private contractService: ContractService,
    private fb: FormBuilder
  ) {}

  contractData: any = {};
  isContractReleased: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

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

  submit() {
    this.contractForm.markAllAsTouched();
    this.contractService.createContract(this.contractForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'تم إصدار العقد بنجاح.';
        this.contractData = res;
        this.isContractReleased = true;
      },
      error: (err) => {
        this.errorMessage =
          'تعذر إصدار العقد في الوقت الحالي، يرجى المحاولة مرة أخرى.';
      },
    });
  }

  generateContract() {
    let DATA: any = document.getElementById('contract');
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let fileWidth = PDF.internal.pageSize.getWidth();
      let fileHeight = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('VT_Contract.pdf');
    });
    this.isContractReleased = false;
    this.contractForm.reset();
  }
}
