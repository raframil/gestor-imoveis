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

  list(query?: string): Observable<Professional[]> {
    let params: HttpParams;
    if (query) {
      params = new HttpParams().set('query', query || '');
    }

    return this.http.get<Professional[]>(`${this.url}/professionals`, {
      params,
    });
  }

  create(professional: Professional): Observable<any> {
    return this.http.post<Professional>(`${this.url}/professionals`, professional);
  }

  update(id: string, professional: Professional): Observable<any> {
    return this.http.put<Professional>(`${this.url}/professionals/${id}`, professional);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/professionals/${id}`);
  }
}
