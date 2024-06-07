import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  endpoint = environment.endpoint;

  public isAuthenticated = new BehaviorSubject(false);

  handleAuth() {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(data: any) {
    return this.http.post(`${this.endpoint}/login`, data);
  }
  logout() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/logout`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  editProfile(data: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    let userID = typeof window !== 'undefined' && localStorage.getItem('id');
    return this.http.post(`${this.endpoint}/users/${userID}`, data, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }
  getUser(id: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.endpoint}/users/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  checkAuth() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/users/check-auth`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
