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

  list(income?: number, month?: string, year?: string): Observable<any> {
    let params = new HttpParams();

    if (month && year && income) {
      params = new HttpParams()
        .set('month', month)
        .set('year', year)
        .set('income', '1');
    }

    if (income && !month && !year) {
      params = new HttpParams().set('income', '1');
    }

    return this.http.get<any>(`${this.url}/sales`, {
      params,
    });
  }

  create(sale: Sale): Observable<any> {
    return this.http.post<Sale>(`${this.url}/sales`, sale);
  }
}
