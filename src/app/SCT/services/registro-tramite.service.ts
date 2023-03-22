import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistroTramiteModel } from '../interfaces/registro-tramite.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroTramiteService {

  private baseUrl: string = environment.baseUrl;
  private _registro!: RegistroTramiteModel;

  constructor( private http: HttpClient ) { }

  get registro(){
    return { ...this._registro }
  }

  addRegistro( body: RegistroTramiteModel ){
    const url = `${ this.baseUrl }/registroTramite/agregar`;
    return this.http.post<RegistroTramiteModel>( url, body ).pipe(
      catchError(err => of(err.error.MSG))
      );
  }

}
