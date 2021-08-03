import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  list(query?: string): Observable<Property[]> {
    let params: HttpParams;
    if (query) {
      params = new HttpParams().set('query', query || '');
    }

    return this.http.get<Property[]>(`${this.url}/properties`, {
      params,
    });
  }
}
