import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginForm, AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private _usuario!: Usuario;

  constructor(
    private http: HttpClient
  ) { }

  get usuario(){
    return {...this._usuario};
  }


  login(body: LoginForm){
    const url = `${this.baseUrl}/auth/login`;

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

  cerrarSesion(){
    sessionStorage.removeItem('token');
  }

  validarToken(){
    const url = `${this.baseUrl}/auth/validartoken`;
    const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers}).pipe(
      map(res =>{
        const NOMBRE_COMPLETO = `${res.NOMBRE} ${res.APELLIDO_1} ${res.APELLIDO_2}`;
        this._usuario={
          CEDULA    : res.CEDULA!,
          NOMBRE    : res.NOMBRE!,
          APELLIDO_1: res.APELLIDO_1!,
          APELLIDO_2: res.APELLIDO_2!,
          NOMBRE_COMPLETO,
          ROL       : res.ROL!
        }
        return res.OK;
      }),
      catchError(err => of(false))
    );

  }

}
