import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient) {}
  endpoint = environment.endpoint;

  getContracts() {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/contracts`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  createContract(data: any) {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.post(
      `${this.endpoint}/contracts/create-paid-contract`,
      data,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }

  getContract(id: string | null) {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/contracts/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  updateContract(id: string | null, data: any) {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.post(`${this.endpoint}/contracts/${id}`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  filterContracts(filter: string | null) {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/contracts/filter/${filter}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  searchContracts(id: string | null) {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.get(`${this.endpoint}/contracts/search/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  deleteContract(id: string) {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    return this.http.delete(`${this.endpoint}/contracts/${id}`, {
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
