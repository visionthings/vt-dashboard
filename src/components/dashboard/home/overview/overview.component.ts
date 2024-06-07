import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../../services/stats.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleExclamation,
  faFileContract,
  faFileWaveform,
  faFilterCircleXmark,
  faPeopleRoof,
  faSackDollar,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  constructor(private statsService: StatsService) {}

  icons = {
    users: faUserGroup,
    requests: faPeopleRoof,
    revenues: faSackDollar,
    contracts: faFileContract,
    unpaid_contracts: faFilterCircleXmark,
    expiring_contracts: faFileWaveform,
    expired_contracts: faCircleExclamation,
  };

  overviewData: any = [];
  contractData: any = [];
  ngOnInit(): void {
    this.statsService.overview().subscribe({
      next: (res: any) => {
        console.log(res);
        this.overviewData = [
          {
            id: 1,
            icon: this.icons.users,
            title: 'عدد الأعضاء في المنصة',
            count: res.users,
          },
          {
            id: 2,
            icon: this.icons.requests,
            title: 'طلبات الزيارة الجديدة',
            count: res.requests,
          },
          {
            id: 3,
            icon: this.icons.revenues,
            title: 'الإيرادات',
            count: res.revenues,
          },
        ];
        this.contractData = [
          {
            id: 1,
            icon: this.icons.contracts,
            title: 'العقود المسجلة في المنصة',
            count: res.contracts,
          },
          {
            id: 2,
            icon: this.icons.unpaid_contracts,
            title: 'العقود غير المدفوعة',
            count: res.unpaid_contracts,
          },
          {
            id: 3,
            icon: this.icons.expiring_contracts,
            title: 'العقود الموشكة على الإنتهاء',
            count: res.expiring_contracts,
          },
          {
            id: 4,
            icon: this.icons.expired_contracts,
            title: 'العقود الغير مجددة',
            count: res.expired_contracts,
          },
        ];
      },
    });
  }
}
