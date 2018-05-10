import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable ,  of } from 'rxjs';

@Injectable()
export class ApiService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get(url: string): Observable<any> {
    return this.http.get<any>(this.getFullURL(url), this.getHttpOptions())
      .pipe(
        catchError(this.handleError<any>())
      );
  }

  post(url: string, body: Object): Observable<any> {
    return this.http.post<any[]>(this.getFullURL(url), body, this.getHttpOptions())
      .pipe(
        catchError(this.handleError())
      );
  }



  put(url: string, body: Object): Observable<any> {
    return null;
  }

  delete(url: string): Observable<any> {
    return null;
  }

  getFullURL(url: string): string {
    return `${this.baseUrl}/${url}`;
  }

  getHttpOptions(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
