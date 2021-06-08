import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { Data } from './models/data';
import { Accounts } from './models/accounts';

import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _refresh$ = new Subject<void>();

  
  private baseURL = "http://localhost:3000";
  private REST_API_SERVER_DATA = "http://localhost:3000/data";
  private REST_API_SERVER_ACCOUNT = "http://localhost:3000/account";
  
  constructor(private httpClient: HttpClient) { }
  
  get refresh$() {
    return this._refresh$;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  GetTransactions(): Observable<Data> {
    return this.httpClient.get<Data>(this.REST_API_SERVER_DATA).pipe(retry(3), catchError(this.handleError));
  }

  GetAccountRecords(): Observable<any> {
    return this.httpClient.get<Accounts[]>(this.REST_API_SERVER_ACCOUNT).pipe(retry(3), catchError(this.handleError));
  }

  create(data: any): Observable<Data> {
    return this.httpClient.post<Data>(`${this.baseURL}/data`, data)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  updateAccountRecords(id: any, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/${id}`, data)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );;
  }

}