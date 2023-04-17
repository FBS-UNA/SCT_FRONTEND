import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Cliente, ClienteInvitadoResponse, ClienteResponse } from '../interfaces/cliente.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl : string = environment.baseUrl;
  private _cliente!: Cliente;

  constructor(private http: HttpClient) { }

  get cliente(){
    return {...this._cliente}
  }

  getCliente(cedula:string){
    const url = `${this.baseUrl}/clientes/`;
    const headers = new HttpHeaders().set('cedula',cedula)
    return this.http.get<ClienteResponse>(url, {headers}).pipe(
      tap(
        res=>{
          if(res.OK){
            this._cliente = res.CLIENTE!;
          }
        }
      ),map(
        res => res.OK
      ),
      catchError(err => of(err.error.MSG))
    );
  }

  addCliente(body:Cliente){
    const url = `${this.baseUrl}/clientes/agregarInvitado`;
    return this.http.post<ClienteInvitadoResponse>(url,body).pipe(
        catchError(err => of(err.error.MSG))
      );
  }

}
