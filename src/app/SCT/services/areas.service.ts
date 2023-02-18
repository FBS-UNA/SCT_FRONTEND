import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Area, AreaResponse } from '../interfaces/area.interface';
import { catchError, map, tap } from 'rxjs/operators';
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
          console.log(res);
          this._areas = res.AREAS!;
        }
      }),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    ).subscribe();

  }

}
