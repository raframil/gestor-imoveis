import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  list(query?: string): Observable<Sale[]> {
    let params: HttpParams;
    if (query) {
      params = new HttpParams().set('query', query || '');
    }

    return this.http.get<Sale[]>(`${this.url}/sales`, {
      params,
    });
  }

  create(sale: Sale): Observable<any> {
    return this.http.post<Sale>(`${this.url}/sales`, sale);
  }
}
