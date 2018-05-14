import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError,  of } from 'rxjs';

@Injectable()
export class ApiService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get(url: string): Observable<any> {
    return this.http.get<any>(this.getFullURL(url), this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );


  }

  post(url: string, body: Object): Observable<any> {


    return this.http.post<any>(this.getFullURL(url), body, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
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
      }),
      observe: 'response'
    };
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }

    return throwError(error);
  };


}
