import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegistroTramiteModel } from '../interfaces/registro-tramite.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroTamiteService {
  private baseUrl : string = environment.baseUrl;
  private _registro !: RegistroTramiteModel; 

  constructor(private http: HttpClient) { }

  get registro(){
    return {...this._registro}
  }

  addRegistroTramite(body:RegistroTramiteModel){
    const url =  `${this.baseUrl}/registroTramite/agregarTramite`;
    return this.http.post<RegistroTramiteModel>(url,body).pipe(
      catchError(err => of(err.error.MSG))
    )
  }

  

}
