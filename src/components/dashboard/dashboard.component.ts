import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  sidebarItems = [
    { id: 1, title: 'الرئيسية', path: 'home' },
    { id: 2, title: 'رسائل الزوار', path: 'inbox' },
    { id: 3, title: 'العقود المسجلة', path: 'registered-contracts' },
    { id: 4, title: 'طلبات الزيارة', path: 'visit-requests' },
    { id: 5, title: 'كوبونات الخصم', path: 'promocodes' },
  ];
}
