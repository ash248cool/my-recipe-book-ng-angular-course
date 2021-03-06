import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  Signup(email: string, password: string) {
   return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_a4vJ0PQBz0n7-cNxxCBUWx0lBwl7HYk',
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  Login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_a4vJ0PQBz0n7-cNxxCBUWx0lBwl7HYk',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred, please try again after sometime';
    if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email address already in use';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Incorrect Username';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect Password';
        break;
      }
    return throwError(errorMessage);
  }

}
