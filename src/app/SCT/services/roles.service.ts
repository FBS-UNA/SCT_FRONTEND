import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol, RolesResponse } from '../interfaces/roles.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, of, tap } from 'rxjs';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrl : string = environment.baseUrl;
  private _roles : Rol[]=[];
  private _rolesU : Rol[]=[];

  get roles(){
    return [...this._roles];
  }

  get rolesU(){
    return [...this._rolesU]
  }

  constructor(
    private http: HttpClient
  ) { }

  getRoles(){
    const url = `${this.baseUrl}/roles`;

    return this.http.get<RolesResponse>(url).pipe(    
      tap(res=>{
        if(res.OK){
          this._roles = res.ROLES!;
        }
      }),
      // Quitar este Delay, solo sirve para probar o ver la animacion de carga
      delay(500),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );
  }


  getRolesUsuario(cedula: string){
    const url = `${this.baseUrl}/roles/rolesusuario`;
    const body = {
      CEDULA_USUARIO: cedula
    };
    return this.http.post<RolesResponse>(url, body).pipe(
      tap(res=>{
        if(res.OK){
          this._rolesU = res.ROLES!;
        }
      }),
      map(res => res.ROLES),
      catchError(err => of([]))
    );
  }

  updateUsuarioRoles(cedula:string, roles:Rol[]){
    const url = `${this.baseUrl}/roles/asignarroles`
    const body = {
      CEDULA_USUARIO: cedula,
      NOMBRE_ROL: roles
    }
    return this.http.post<RolesResponse>(url,body).pipe(
      tap(res=>{
        if(res.OK){
          this._rolesU = res.ROLES!;
          console.log(this._rolesU)
        }
      }),
      map(res => res.OK),
      catchError(err=> of(err.error.msg))
    );
  }

}
