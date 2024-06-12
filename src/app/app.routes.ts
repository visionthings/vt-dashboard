import { Routes } from '@angular/router';
import { HomeComponent } from '../components/dashboard/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { CreateNewMailComponent } from '../components/dashboard/messages/create-new-mail/create-new-mail.component';
import { InboxComponent } from '../components/dashboard/messages/inbox/inbox.component';
import { OutboxComponent } from '../components/dashboard/messages/outbox/outbox.component';
import { CreateNewContractComponent } from '../components/dashboard/contracts-management/create-new-contract/create-new-contract.component';
import { ContractsComponent } from '../components/dashboard/contracts-management/contracts/contracts.component';
import { OpenVisitRequestsComponent } from '../components/dashboard/visit-requests/open-visit-requests/open-visit-requests.component';
import { ClosedVisitRequestsComponent } from '../components/dashboard/visit-requests/closed-visit-requests/closed-visit-requests.component';
import { PromocodesComponent } from '../components/dashboard/promocodes/promocodes/promocodes.component';
import { CreateNewPromocodeComponent } from '../components/dashboard/promocodes/create-new-promocode/create-new-promocode.component';
import { MembersComponent } from '../components/dashboard/membership-management/members/members.component';
import { BlockedMembersComponent } from '../components/dashboard/membership-management/blocked-members/blocked-members.component';
import { EditContractComponent } from '../components/dashboard/contracts-management/edit-contract/edit-contract.component';
import { MemberComponent } from '../components/dashboard/membership-management/member/member.component';

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
      // Home
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },

      // Messages
      {
        path: 'create-new-mail',
        component: CreateNewMailComponent,
        canActivate: [authGuard],
      },
      { path: 'inbox', component: InboxComponent, canActivate: [authGuard] },
      { path: 'outbox', component: OutboxComponent, canActivate: [authGuard] },

      // Contracts Management
      {
        path: 'create-new-contract',
        component: CreateNewContractComponent,
        canActivate: [authGuard],
      },
      {
        path: 'edit-contract/:id',
        component: EditContractComponent,
        canActivate: [authGuard],
      },
      {
        path: 'contracts',
        component: ContractsComponent,
        canActivate: [authGuard],
      },

      // Visit Requests
      {
        path: 'open-visit-requests',
        component: OpenVisitRequestsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'closed-visit-requests',
        component: ClosedVisitRequestsComponent,
        canActivate: [authGuard],
      },

      // Promocodes
      {
        path: 'create-new-promocode',
        component: CreateNewPromocodeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'promocodes',
        component: PromocodesComponent,
        canActivate: [authGuard],
      },

      // Membership Management
      {
        path: 'members',
        component: MembersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'member/:id',
        component: MemberComponent,
        canActivate: [authGuard],
      },
      {
        path: 'blocked-members',
        component: BlockedMembersComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];
