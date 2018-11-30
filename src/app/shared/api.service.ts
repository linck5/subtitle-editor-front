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
    tap(res => { if(this.logApi) {console.log("> Res", res)} })
  ];



  public logApi: boolean = false;

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    let obs = this.http.get<T>(this.getFullURL(url))
    return obs
      .pipe.apply(obs,[ //I have to call 'apply' because TS devs hate the spread operator
        tap(() =>{if(this.logApi) this.logRequest("GET", url)}),
        ...this.servicePipe]);
  }

  post(url: string, body: Object): Observable<any> {
    let obs = this.http.post<any>(this.getFullURL(url), body)
    return obs
      .pipe.apply(obs,[
        tap(() =>{if(this.logApi) this.logRequest("POST", url, body)}),
        ...this.servicePipe]);
  }

  put(url: string, body: Object): Observable<any> {
    let obs = this.http.put<any>(this.getFullURL(url), body)
    return obs
      .pipe.apply(obs,[
        tap(() =>{if(this.logApi) this.logRequest("PUT", url, body)}),
        ...this.servicePipe]);
  }

  patch(url: string, body: Object): Observable<any> {
    let obs = this.http.patch<any>(this.getFullURL(url), body)
    return obs
      .pipe.apply(obs,[
        tap(() =>{if(this.logApi) this.logRequest("PATCH", url, body)}),
        ...this.servicePipe]);
  }

  delete(url: string): Observable<any> {
    let obs = this.http.delete<any>(this.getFullURL(url))
    return obs
      .pipe.apply(obs,[
        tap(() =>{if(this.logApi) this.logRequest("DELETE", url)}),
        ...this.servicePipe]);
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
