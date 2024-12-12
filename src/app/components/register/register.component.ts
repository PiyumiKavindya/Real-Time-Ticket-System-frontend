import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Register</h2>
      <div class="user-type-selector">
        <button [class.active]="userType === 'customer'" (click)="userType = 'customer'">Customer</button>
        <button [class.active]="userType === 'vendor'" (click)="userType = 'vendor'">Vendor</button>
      </div>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" [(ngModel)]="email" name="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>
        <div>
          <label for="mobileNo">Mobile Number:</label>
          <input type="tel" id="mobileNo" [(ngModel)]="mobileNo" name="mobileNo">
        </div>
        <div *ngIf="userType === 'customer'">
          <label>
            <input type="checkbox" [(ngModel)]="isPremium" name="isPremium">
            Premium Account
          </label>
        </div>
        <div *ngIf="userType === 'vendor'">
          <label>
            <input type="checkbox" [(ngModel)]="isAdmin" name="isAdmin">
            Admin Account
          </label>
        </div>
        <button type="submit">Register</button>
        <p *ngIf="error" class="error">{{ error }}</p>
      </form>
    </div>
  `,
  styles: [`
    .user-type-selector {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
    }
    .user-type-selector button {
      flex: 1;
      padding: 8px;
    }
    .active {
      background-color: #0056b3;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  mobileNo?: number;
  isPremium = false;
  isAdmin = false;
  userType: 'customer' | 'vendor' = 'customer';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.email || !this.password) {
      this.error = 'Please fill in all required fields';
      return;
    }

    if (this.userType === 'customer') {
      this.authService.registerCustomer({
        username: this.username,
        email: this.email,
        password: this.password,
        mobileNo: this.mobileNo,
        isPremium: this.isPremium
      }).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => this.error = err.error || 'Registration failed'
      });
    } else {
      this.authService.registerVendor({
        username: this.username,
        email: this.email,
        password: this.password,
        mobileNo: this.mobileNo,
        isAdmin: this.isAdmin
      }).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => this.error = err.error || 'Registration failed'
      });
    }
  }
}