import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { UsuarioResponse } from '../interfaces/usuario.interface';
import { catchError, delay, map, of, tap } from 'rxjs';
import { Rol, RolesResponse } from '../interfaces/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string = environment.baseUrl;
  private _usuarios: Usuario[] = [];


  get usuarios() {
    return [...this._usuarios];
  }

  constructor(
    private http: HttpClient
  ) { }
  
  getUsuarios() {
    const url = `${this.baseUrl}/usuarios`;

    return this.http.get<UsuarioResponse>(url).pipe(
      tap(res => {
        if (res.OK) {
          this._usuarios = res.USUARIOS!;
        }
      }),
      // Quitar este Delay, solo sirve para probar o ver la animacion de carga
      delay(500),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );
  }

}
