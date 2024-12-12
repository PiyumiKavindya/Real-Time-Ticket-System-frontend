import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container" style=" padding:50px">
      <h2>Login</h2>
      <div class="user-type-selector" >
        <button style="border-radius:10px;border:none" [class.active]="userType === 'customer'" (click)="userType = 'customer'">Customer</button>
        <button style="border-radius:10px;border:none" [class.active]="userType === 'vendor'" (click)="userType = 'vendor'">Vendor</button>
      </div>
      <form (ngSubmit)="onSubmit()">
        <div style="display: flex; ">
          <label for="username">Username:</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit">Login</button>
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
export class LoginComponent {
  username = '';
  password = '';
  userType: 'customer' | 'vendor' = 'customer';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    const loginObservable = this.userType === 'customer' 
      ? this.authService.loginCustomer(this.username, this.password)
      : this.authService.loginVendor(this.username, this.password);

    loginObservable.subscribe({
      next: () => {
        this.router.navigate(['/tickets']);
      },
      error: (err) => {
        this.error = err.error || 'Login failed';
      }
    });
  }
}