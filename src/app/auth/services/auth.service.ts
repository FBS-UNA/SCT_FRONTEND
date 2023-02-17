import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginForm, AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private _usuario!:any;

  constructor(
    private http: HttpClient
  ) { }


  login(loginForm: LoginForm){
    const url = `${this.baseUrl}/auth/login`;
    const body = loginForm;

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({OK, TOKEN})=>{
          if(OK){
            sessionStorage.setItem('token', TOKEN!);
          }
        }),
        map(res => res.OK),
        catchError(err => of(err.error.msg))
      );

  }

}
