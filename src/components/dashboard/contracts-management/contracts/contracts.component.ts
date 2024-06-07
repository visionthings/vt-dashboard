import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/empty-state/empty-state.component';
import { HeadingComponent } from '../../../../shared/heading/heading.component';
import { SuccessMessageComponent } from '../../../../shared/success-message/success-message.component';
import { ErrorMessageComponent } from '../../../../shared/error-message/error-message.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContractService } from '../../../../services/contract.service';
import {
  faFileArrowDown,
  faFilePen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ContractPdfComponent } from '../../contract-pdf/contract-pdf.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    EmptyStateComponent,
    HeadingComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    PaginationComponent,
    FontAwesomeModule,
    ContractPdfComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss',
})
export class ContractsComponent implements OnInit {
  constructor(
    private contractService: ContractService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  isLoading: boolean = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  res: any = [];
  contracts: any = [];
  currentPage: string = '';
  contractData: any = {};

  icons = {
    download: faFileArrowDown,
    edit: faFilePen,
    delete: faTrashCan,
  };

  // Edit Contract
  edit(id: string) {
    this.router.navigateByUrl(`/dashboard/edit-contract/${id}`);
  }
  // Delete Contract
  delete(id: string) {
    this.contractService.deleteContract(id).subscribe({
      next: (res) => {
        this.successMessage = 'تم حذف العقد بنجاح.';
        this.setPage(this.currentPage);
        setTimeout(() => {
          this.successMessage = null;
        }, 7000);
      },
      error: (error) => {
        this.errorMessage =
          'تعذر حذف العقد في الوقت الحالي، يرجى المحاولة مرة أخرى.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 7000);
      },
    });
  }

  setPage(page: any) {
    if (page) {
      this.currentPage = page;
      this.contractService.getPage(page).subscribe({
        next: (res: any) => {
          this.res = res;
          this.contracts = res.data;
        },
        error: () => {},
      });
    }
  }

  updateContractData(data: any) {
    this.contractData = data;
  }
  async generateContract(data: any) {
    this.contractData = data;

    await new Promise((resolve) => setTimeout(resolve, 100));
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
  }

  // Filter Contracts
  filterContracts(event: any) {
    let filter = event.target.value;

    this.contractService.filterContracts(filter).subscribe({
      next: (res: any) => {
        this.contracts = res.data;
        this.res = res;
        this.currentPage = `${res.path}?page=1`;
      },
    });
  }

  // Search Form
  searchForm = this.fb.group({
    contract_number: ['', Validators.required],
  });

  get contract_number() {
    return this.searchForm.controls['contract_number'];
  }

  search() {
    const contractNumber = this.searchForm.controls.contract_number.value;
    this.contractService.searchContracts(contractNumber).subscribe({
      next: (res: any) => {
        console.log(res);

        this.contracts = [res];
      },
    });
  }

  ngOnInit(): void {
    this.contractService.getContracts().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.contracts = res.data;
        this.res = res;
        this.currentPage = `${res.path}?page=1`;
      },
    });
  }
}
