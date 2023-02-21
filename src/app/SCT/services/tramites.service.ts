import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tramite, TramiteResponse } from '../interfaces/tramite.interface';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {

  private baseUrl: string = environment.baseUrl;
  private _tramites: Tramite[] = [];

  constructor(
    private http: HttpClient
  ) { }

  get tramites(){
    return [...this._tramites];
  }

  getTramites() {
    const url = `${this.baseUrl}/tramites`;

    return this.http.get<TramiteResponse>(url).pipe(
      tap(res => {
        if (res.OK) {
          this._tramites = res.TRAMITES!;
        }
      }),
      // Quitar este Delay, solo sirve para probar o ver la animacion de carga
      delay(500),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );
  }

  addTramite(tramite: Tramite){
    const url = `${this.baseUrl}/tramites/agregar`;
    const body = tramite;
  
    return this.http.post<TramiteResponse>(url,body).pipe(
      catchError(err => of(err.error.msg))
    );
  }

  updateTramite(tramite: Tramite){
    const url = `${this.baseUrl}/tramites/actualizar`;
    const body = tramite;

    return this.http.put<TramiteResponse>(url,body).pipe(
      catchError(err => of(err.error.msg))
    );
  }

  updateEstadoTramite(tramite: Tramite){
    const url = `${this.baseUrl}/tramites/actualizarestado`;
    const body = { 
      ID_TRAMITE : tramite.ID_TRAMITE,
      ESTADO : tramite.ESTADO ? 1 : 0
    };

    return this.http.put<TramiteResponse>(url, body).pipe(
      catchError(err=> of(err.error.msg))
    );
  }

  deleteTramite(idTramite: number){
    const url = `${this.baseUrl}/tramites/eliminar`;
    const headers = new HttpHeaders().set('id-area', idTramite.toString());

    return this.http.delete<TramiteResponse>(url, {headers}).pipe(
      catchError(err => of(err.error.msg))
    );
  }
  
}
