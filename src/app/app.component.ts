import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header>
      <h1>{{ title }}</h1>
      <nav>
        <a routerLink="/login">Login</a> |
        <a routerLink="/register">Register</a> |
        <a routerLink="/tickets">Tickets</a>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      background-color: #f8f9fa;
      padding: 1rem;
      margin-bottom: 2rem;
      text-align: center;
    }
    h1 {
      color: #333;
      margin-bottom: 1rem;
    }
    main {
      padding: 0 1rem;
    }
  `]
})
export class AppComponent {
  title = 'Ticket Management System';
}