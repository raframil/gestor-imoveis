import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Professional } from '../models/professional';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalsService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  list(params?: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.url}/professionals`, {
      params,
    });
  }

  create(professional: Professional): Observable<any> {
    return this.http.post<Professional>(
      `${this.url}/professionals`,
      professional
    );
  }

  update(id: string, professional: Professional): Observable<any> {
    return this.http.put<Professional>(
      `${this.url}/professionals/${id}`,
      professional
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/professionals/${id}`);
  }

  getById(id: string, month?: string, year?: string): Observable<any> {
    let params: HttpParams;

    if (month && year) {
      params = new HttpParams().set('month', month).set('year', year);
    }

    return this.http.get<any>(`${this.url}/professionals/${id}`, {
      params,
    });
  }
}
