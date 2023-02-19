import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Area, AreaResponse } from '../interfaces/area.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private baseUrl : string = environment.baseUrl;
  private _areas : Area[] = [];

  constructor(
    private http: HttpClient
  ) { }

  get areas(){
    return [...this._areas];
  }


  getAreas(){
    const url = `${this.baseUrl}/areas`;

    return this.http.get<AreaResponse>(url).pipe(    
      tap(res=>{
        if(res.OK){
          this._areas = res.AREAS!;
        }
      }),
      // Quitar este Delay, solo sirve para probar o ver la animacion de carga
      delay(500),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );

  }

  updateArea(area: Area){
    const url = `${this.baseUrl}/areas/actualizar`;
    const body = area;

    return this.http.put<AreaResponse>(url,body).pipe(
      catchError(err => of(err.error.msg))
    );
  }

  deleteArea(idArea: number){
    const url = `${this.baseUrl}/areas/eliminar`;
    const headers = new HttpHeaders().set('id-area', idArea.toString());

    return this.http.delete<AreaResponse>(url, {headers}).pipe(
      catchError(err => of(err.error.msg))
    );
  }

}
