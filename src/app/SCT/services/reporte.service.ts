import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Reporte, ReporteResponse } from '../interfaces/reporte.interface';
import { catchError, delay, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private baseUrl : string = environment.baseUrl;
  private _reporte : Reporte[] = [];


  constructor(
    private http: HttpClient
  ) { }


  get reporte(){
    return [...this._reporte];
  }


  getReporte(){
    const url = `${this.baseUrl}/reporte`;

    return this.http.get<ReporteResponse>(url).pipe(
      tap(res=>{ 
        if(res.OK){
          this._reporte = res.REPORTE!;
      }}),
      // Quitar este Delay, solo sirve para probar o ver la animacion de carga
      delay(500),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    )
  }
}
