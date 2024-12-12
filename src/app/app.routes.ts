import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.components';
import { RegisterComponent } from './components/register/register.component';
import { TicketManagementComponent } from './components/ticket-management/ticket-management.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tickets', component: TicketManagementComponent }
];