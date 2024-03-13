import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  endpoint = environment.endpoint;

  // Messages
  getMessages() {
    return this.http.get(`${this.endpoint}/contact-messages`);
  }
  deleteMessage(messageID: string) {
    return this.http.delete(`${this.endpoint}/contact-messages/${messageID}`);
  }

  // Contracts
  getContracts() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/contracts`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // Visit requests
  getVisitRequests() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/visit-request`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  deleteVisitRequest(id: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.delete(`${this.endpoint}/visit-request/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // Promocodes
  addPromocode(data: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.post(`${this.endpoint}/promocodes`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  getPromocodes() {
    return this.http.get(`${this.endpoint}/promocodes`);
  }
  deletePromocode(id: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.delete(`${this.endpoint}/promocodes/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // Statistics
  getVisitsCount() {
    return this.http.get(`${this.endpoint}/visits/count`);
  }
  getContractsSales() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/contracts/sales`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  getContractsCount() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/contracts/count`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  getUsersCount() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/users/count`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
