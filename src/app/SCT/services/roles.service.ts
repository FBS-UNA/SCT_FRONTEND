import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol, RolesResponse } from '../interfaces/roles.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrl : string = environment.baseUrl;
  private _roles : Rol[]=[];


  get roles(){
    return [...this._roles];
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
}
