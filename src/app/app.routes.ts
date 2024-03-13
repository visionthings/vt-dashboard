import { Routes } from '@angular/router';
import { HomeComponent } from '../components/dashboard/home/home.component';
import { InboxComponent } from '../components/dashboard/inbox/inbox.component';
import { RegisteredContractsComponent } from '../components/dashboard/registered-contracts/registered-contracts.component';
import { PromocodesComponent } from '../components/dashboard/promocodes/promocodes.component';
import { MembersComponent } from '../components/dashboard/members/members.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { VisitRequestsComponent } from '../components/dashboard/visit-requests/visit-requests.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'prefix',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: 'inbox', component: InboxComponent, canActivate: [authGuard] },
      {
        path: 'registered-contracts',
        component: RegisteredContractsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'visit-requests',
        component: VisitRequestsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'promocodes',
        component: PromocodesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'members',
        component: MembersComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];
