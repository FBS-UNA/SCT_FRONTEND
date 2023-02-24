import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tramite, TramiteResponse, TramitesAsociados } from '../interfaces/tramite.interface';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {

  private baseUrl: string = environment.baseUrl;
  private _tramites: Tramite[] = [];


  constructor(
    private http: HttpClient
  ) { }

  get tramites() {
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

  getTramitesAsociados(idArea: number) {
    const url = `${this.baseUrl}/tramites-areas/asociados`;
    const headers = new HttpHeaders().set('id-area', idArea.toString());

    return this.http.get<TramitesAsociados>(url, { headers }).pipe(
      catchError(err => of(err.error.msg))
    );

  }

  getTramitesNoAsociados(idArea: number) {
    const url = `${this.baseUrl}/tramites-areas/no-asociados`;
    const headers = new HttpHeaders().set('id-area', idArea.toString());

    return this.http.get<TramitesAsociados>(url, { headers }).pipe(
      catchError(err => of(err.error.msg))
    );
  }

  asociarTramite(ID_AREA: number, ID_TRAMITE: number){
    const url = `${this.baseUrl}/tramites-areas/asociar`;
    const body = {ID_AREA, ID_TRAMITE };

    return this.http.post<TramitesAsociados>(url, body).pipe(
      catchError(err => of(err.error.msg))
    );
  }
  
  desasociarTramite(ID_AREA: number, ID_TRAMITE: number){
    const url = `${this.baseUrl}/tramites-areas/desasociar`;
    const body = {ID_AREA, ID_TRAMITE };

    return this.http.post<TramitesAsociados>(url, body).pipe(
      catchError(err => of(err.error.msg))
    );
  }

  addTramite(tramite: Tramite) {
    const url = `${this.baseUrl}/tramites/agregar`;
    const body = tramite;

    return this.http.post<TramiteResponse>(url, body).pipe(
      catchError(err => of(err.error.msg))
    );
  }

  updateTramite(tramite: Tramite) {
    const url = `${this.baseUrl}/tramites/actualizar`;
    const body = tramite;

    return this.http.put<TramiteResponse>(url, body).pipe(
      catchError(err => of(err.error.msg))
    );
  }

  updateEstadoTramite(tramite: Tramite) {
    const url = `${this.baseUrl}/tramites/actualizarestado`;
    const body = {
      ID_TRAMITE: tramite.ID_TRAMITE,
      ESTADO: tramite.ESTADO ? 1 : 0
    };

    return this.http.put<TramiteResponse>(url, body).pipe(
      catchError(err => of(err.error.msg))
    );
  }

  deleteTramite(idTramite: number) {
    const url = `${this.baseUrl}/tramites/eliminar`;
    const headers = new HttpHeaders().set('id-tramite', idTramite.toString());

    console.log(idTramite)

    return this.http.delete<TramiteResponse>(url, { headers }).pipe(
      catchError(err => of(err.error.msg))
    );
  }

}
