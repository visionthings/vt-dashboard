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
  sendMail(data: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.post(`${this.endpoint}/send-mail`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getInbox() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/messages`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getInboxPage(pageURL: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(pageURL, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  deleteFromInbox(id: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.delete(`${this.endpoint}/messages/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getOutbox() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/outbox`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getOutboxPage(pageURL: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(pageURL, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  deleteFromOutbox(id: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.delete(`${this.endpoint}/delete-mail/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // Visit Requests
  openVisitRequests() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/open-visit-requests`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  closedVisitRequests() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/closed-visit-requests`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  closeTicket(id: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.post(
      `${this.endpoint}/close-ticket/${id}`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
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
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/promocodes`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  getPromocodesPage(url: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
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

  // PUBLIC
  getPage(pageURL: string) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(pageURL, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
