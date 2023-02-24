import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistroEntradaModel} from '../interfaces/regsitro-entrada.interface';


@Injectable({
  providedIn: 'root'
})
export class RegistroEntradaService {
   private baseUrl : string = environment.baseUrl;
  private _registro!: RegistroEntradaModel;

  constructor(private http: HttpClient) { }

  get registro(){
    return {...this._registro}
  }

  addRegistro(body:RegistroEntradaModel){
    const url = `${this.baseUrl}/registroEntrada/agregar`;
    return this.http.post<RegistroEntradaModel>(url,body).pipe(
        catchError(err => of(err.error.MSG))
      );
  }


}
