import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}
  endpoint = environment.endpoint;

  overview() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/stats/overview`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  contracts() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/stats/contracts`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  requests() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/stats/requests`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  sales() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/stats/sales`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
