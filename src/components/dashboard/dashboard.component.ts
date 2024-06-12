import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faEnvelopeOpenText,
  faFileSignature,
  faHouseChimney,
  faFileVideo,
  faTags,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
    FooterComponent,
    FontAwesomeModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  // Icons
  icons = {
    arrow: faChevronLeft,
    home: faHouseChimney,
    messages: faEnvelopeOpenText,
    contract: faFileSignature,
    visitRequests: faFileVideo,
    promocodes: faTags,
    members: faUsers,
  };

  // Sidebar
  sidebarItems = [
    {
      id: 2,
      icon: this.icons.messages,
      title: 'الرسائل',
      path: 'inbox',
      categories: [
        { id: 2.1, title: 'إرسال رسالة جديدة', path: 'create-new-mail' },
        { id: 2.2, title: 'البريد الوارد', path: 'inbox' },
        { id: 2.3, title: 'البريد الصادر', path: 'outbox' },
        {
          id: 2.4,
          title: 'تعيين بريد لتلقي الإشعارات',
          path: 'set-contact-email',
        },
      ],
    },
    {
      id: 3,
      icon: this.icons.contract,
      title: 'إدارة العقود',
      categories: [
        { id: 3.1, title: 'إصدار عقد جديد', path: 'create-new-contract' },
        { id: 3.2, title: 'العقود المسجلة', path: 'contracts' },
      ],
    },
    {
      id: 4,
      icon: this.icons.visitRequests,
      title: 'طلبات الزيارة',
      categories: [
        {
          id: 4.1,
          title: 'طلبات الزيارة المفتوحة',
          path: 'open-visit-requests',
        },
        {
          id: 4.2,
          title: 'طلبات الزيارة المغلقة',
          path: 'closed-visit-requests',
        },
      ],
    },
    {
      id: 5,
      icon: this.icons.promocodes,
      title: 'كوبونات الخصم',
      categories: [
        {
          id: 5.1,
          title: 'إنشاء كوبون خصم جديد',
          path: 'create-new-promocode',
        },
        { id: 5.2, title: 'كوبونات الخصم', path: 'promocodes' },
      ],
    },
    {
      id: 6,
      icon: this.icons.members,
      title: 'إدارة العضويات',
      categories: [
        { id: 6.1, title: 'جميع الأعضاء', path: 'members' },
        { id: 6.2, title: 'العضويات الموقوفة', path: 'blocked-members' },
      ],
    },
  ];

  activeItem = 0;
  updateActiveItem(id: number): void {
    this.activeItem === id ? (this.activeItem = 0) : (this.activeItem = id);
  }

  // On Init
  ngOnInit(): void {
    const url = this.router.url;
    for (let item of this.sidebarItems) {
      for (const cat of item.categories) {
        if (url == `/dashboard/${cat.path}`) {
          this.updateActiveItem(item.id);
        }
      }
    }
  }
}
