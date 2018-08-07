import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError,  of, OperatorFunction } from 'rxjs';

@Injectable()
export class ApiService {

  private baseUrl: string = environment.apiUrl;
  private servicePipe: OperatorFunction<any, any>[] = [
    catchError(this.handleError),
    tap(res => { if(this.logApi) console.log("> Res", res) })
  ];

  public logApi: boolean = false;

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    if(this.logApi) this.logRequest("GET", url);
    return this.http.get<any>(this.getFullURL(url)).pipe(...this.servicePipe);
  }

  post(url: string, body: Object): Observable<any> {
    if(this.logApi) this.logRequest("POST", url, body);
    return this.http.post<any>(this.getFullURL(url), body).pipe(...this.servicePipe);
  }

  put(url: string, body: Object): Observable<any> {
    if(this.logApi) this.logRequest("PUT", url, body);
    return this.http.put<any>(this.getFullURL(url), body).pipe(...this.servicePipe);
  }

  patch(url: string, body: Object): Observable<any> {
    if(this.logApi) this.logRequest("PATCH", url, body);
    return this.http.patch<any>(this.getFullURL(url), body).pipe(...this.servicePipe);
  }

  delete(url: string): Observable<any> {
    if(this.logApi) this.logRequest("DELETE", url);
    return this.http.delete<any>(this.getFullURL(url)).pipe(...this.servicePipe);
  }

  getFullURL(url: string): string {
    return `${this.baseUrl}/${url}`;
  }

  private logRequest(method: string, url: string, body?: Object) {
    console.log(">", `${method} ${url}`);
    if(body) console.log("> Body", body);
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
