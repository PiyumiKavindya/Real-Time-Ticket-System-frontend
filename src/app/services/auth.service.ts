import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, Vendor } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/customer/register`, customer);
  }

  loginCustomer(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/customer/login`, { username, password });
  }

  registerVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.apiUrl}/vendor/register`, vendor);
  }

  loginVendor(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/vendor/login`, { username, password });
  }
}