import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:  HttpClient) { }


  getPlainTextData(): Observable<string> {
    return this.http.get('https://www.ietf.org/rfc/rfc2616.txt', { responseType: 'text' });
  }
}
