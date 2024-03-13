import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContractPdfComponent } from '../contract-pdf/contract-pdf.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-registered-contracts',
  standalone: true,
  imports: [FontAwesomeModule, ContractPdfComponent],
  templateUrl: './registered-contracts.component.html',
  styleUrl: './registered-contracts.component.scss',
})
export class RegisteredContractsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  icons = { arrowDown: faArrowDown };

  contracts: any = undefined;
  isContractsLoaded: boolean = false;

  generateContract() {
    let DATA: any = document.getElementById('contract');
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let fileWidth = PDF.internal.pageSize.getWidth();
      let fileHeight = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Vision_Things_Contract.pdf');
    });
  }

  ngOnInit(): void {
    this.dashboardService.getContracts().subscribe({
      next: (res) => {
        this.contracts = res;
      },
      complete: () => {
        this.isContractsLoaded = true;
      },
    });
  }
}
