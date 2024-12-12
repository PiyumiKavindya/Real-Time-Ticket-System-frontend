import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { TicketPool } from '../../interfaces/ticket-pool.interface';
import { Config } from '../../interfaces/config.interface';

@Component({
  selector: 'app-ticket-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tickets-container">
      <h2>Ticket Management</h2>
      
      <!-- Configuration Section -->
      <div class="config-section" *ngIf="isAdmin">
        <h3>System Configuration</h3>
        <form (ngSubmit)="updateConfig()">
          <div>
            <label for="totalTickets">Total Tickets:</label>
            <input type="number" id="totalTickets" [(ngModel)]="config.totalTickets" name="totalTickets">
          </div>
          <div>
            <label for="maxCapacity">Max Capacity:</label>
            <input type="number" id="maxCapacity" [(ngModel)]="config.maxTicketCapacity" name="maxCapacity">
          </div>
          <div>
            <label for="releaseRate">Release Rate:</label>
            <input type="number" id="releaseRate" [(ngModel)]="config.ticketReleaseRate" name="releaseRate">
          </div>
          <div>
            <label for="retrievalRate">Retrieval Rate:</label>
            <input type="number" id="retrievalRate" [(ngModel)]="config.customerRetrievalRate" name="retrievalRate">
          </div>
          <button type="submit">Update Configuration</button>
        </form>
      </div>

      <!-- Ticket Status -->
      <div class="status-section">
        <h3>Ticket Status</h3>
        <div *ngIf="ticketPool">
          <p>Available Tickets: {{ ticketPool.availableTickets }}</p>
          <p>Released Tickets: {{ ticketPool.releasedTickets }}</p>
          <p>Total Tickets: {{ ticketPool.totalTickets }}</p>
          <p>Max Capacity: {{ ticketPool.maxTicketCapacity }}</p>
        </div>
      </div>

      <!-- Vendor Actions -->
      <div class="vendor-section" *ngIf="isVendor">
        <h3>Add Tickets</h3>
        <form (ngSubmit)="addTickets()">
          <div>
            <label for="ticketCount">Number of Tickets:</label>
            <input type="number" id="ticketCount" [(ngModel)]="ticketCount" name="ticketCount">
          </div>
          <button type="submit">Add Tickets</button>
        </form>
      </div>

      <!-- Customer Actions -->
      <div class="customer-section" *ngIf="!isVendor">
        <h3>Purchase Tickets</h3>
        <form (ngSubmit)="purchaseTickets()">
          <div>
            <label for="purchaseCount">Number of Tickets:</label>
            <input type="number" id="purchaseCount" [(ngModel)]="purchaseCount" name="purchaseCount">
          </div>
          <button type="submit">Purchase Tickets</button>
        </form>
      </div>

      <p *ngIf="error" class="error">{{ error }}</p>
      <p *ngIf="success" class="success">{{ success }}</p>
    </div>
  `,
  styles: [`
    .tickets-container > div {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error {
      color: red;
    }
    .success {
      color: green;
    }
  `]
})
export class TicketManagementComponent implements OnInit {
  ticketPool?: TicketPool;
  config: Config = {
    totalTickets: 0,
    maxTicketCapacity: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0
  };
  ticketCount = 0;
  purchaseCount = 0;
  error = '';
  success = '';
  isAdmin = false; // Should be set based on logged-in user
  isVendor = false; // Should be set based on logged-in user

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.loadTicketStatus();
    this.loadConfig();
  }

  loadTicketStatus() {
    this.ticketService.getTicketStatus().subscribe({
      next: (status) => this.ticketPool = status,
      error: (err) => this.error = err.error || 'Failed to load ticket status'
    });
  }

  loadConfig() {
    this.ticketService.getConfig().subscribe({
      next: (config) => this.config = config,
      error: (err) => this.error = err.error || 'Failed to load configuration'
    });
  }

  updateConfig() {
    this.ticketService.setConfig(this.config).subscribe({
      next: (config) => {
        this.config = config;
        this.success = 'Configuration updated successfully';
      },
      error: (err) => this.error = err.error || 'Failed to update configuration'
    });
  }

  addTickets() {
    if (this.ticketCount <= 0) {
      this.error = 'Please enter a valid number of tickets';
      return;
    }

    this.ticketService.addTickets(this.ticketCount, 1).subscribe({ // vendorId hardcoded for demo
      next: () => {
        this.success = 'Tickets added successfully';
        this.loadTicketStatus();
      },
      error: (err) => this.error = err.error || 'Failed to add tickets'
    });
  }

  purchaseTickets() {
    if (this.purchaseCount <= 0) {
      this.error = 'Please enter a valid number of tickets';
      return;
    }

    this.ticketService.purchaseTickets(this.purchaseCount, 1).subscribe({ // customerId hardcoded for demo
      next: () => {
        this.success = 'Tickets purchased successfully';
        this.loadTicketStatus();
      },
      error: (err) => this.error = err.error || 'Failed to purchase tickets'
    });
  }
}