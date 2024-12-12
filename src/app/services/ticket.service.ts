import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../interfaces/config.interface';
import { TicketPool } from '../interfaces/ticket-pool.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<Config> {
    return this.http.get<Config>(`${this.apiUrl}/config/get-config`);
  }

  setConfig(config: Config): Observable<Config> {
    return this.http.post<Config>(`${this.apiUrl}/config/set-config`, config);
  }

  initConfig(config: Config): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/config/init-config`, config);
  }

  addTickets(count: number, vendorId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/tickets/add-tickets`, {
      type: 'add',
      count,
      vendorId
    });
  }

  purchaseTickets(count: number, customerId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/tickets/purchase-tickets`, {
      type: 'purchase',
      count,
      customerId
    });
  }

  getTicketStatus(): Observable<TicketPool> {
    return this.http.get<TicketPool>(`${this.apiUrl}/tickets/status`);
  }
}