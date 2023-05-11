import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TramitesDonutResponse, ChartInfo, AreasDonutResponse, TotalRegistroResponse, RegistrosPorMesResponse } from '../interfaces/chart.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChartData } from 'chart.js';
import { RegistrosPorAnnioResponse } from '../interfaces/chart.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private baseUrl: string = environment.baseUrl;

  private _tramitesDonutLabels: string[] = [];
  private _tramitesDonutData: number[] = [];

  private _areasDonutLabels: string[] = [];
  private _areasDonutData: number[] = [];

  private _totalReportesMesLineLabels: string[] = [];
  private _totalReportesMesLineData: number[] = [];

  private _totalReportesAnnioLineLabels: string[] = [];
  private _totalReportesAnnioLineData: number[] = [];

  private _totalReportes: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  get tramitesDonutLabels(){
    return [...this._tramitesDonutLabels];
  }
  get tramitesDonutData(){
    return [...this._tramitesDonutData];
  }

  get areasDonutLabels(){
    return [...this._areasDonutLabels];
  }
  get areasDonutData(){
    return [...this._areasDonutData];
  }

  get totalReportesMesLabels(){
    return [...this._totalReportesMesLineLabels];
  }

  get totalReportesMesData(){
    return [...this._totalReportesMesLineData];
  }

  get totalReportesAnnioLabels(){
    return [...this._totalReportesAnnioLineLabels];
  }
  get totalReportesAnnioData(){
    return [...this._totalReportesAnnioLineData];
  }

  get totalReportes(){
    return this._totalReportes;
  }

  


  getTramitesDonut() {
    const url = `${this.baseUrl}/graficas/donut-tramites`;
    let data: any;

    return this.http.get<TramitesDonutResponse>(url).pipe(
      tap(res => {
        if (res.OK) {
          data = this.splitDataResponse(res.TRAMITES_DONUT!);
          this._tramitesDonutLabels = data.labels;
          this._tramitesDonutData = data.data;
        }
      }),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );

  }

  getAreasDonut() {
    const url = `${this.baseUrl}/graficas/donut-areas`;
    let data: any;

    return this.http.get<AreasDonutResponse>(url).pipe(
      tap(res => {
        if (res.OK) {
          data = this.splitDataResponse(res.AREAS_DONUT!);
          this._areasDonutLabels = data.labels;
          this._areasDonutData = data.data;
          
        }
      }),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );
  }

  getTotalReportes() {
    const url = `${this.baseUrl}/graficas/total-registros`;

    return this.http.get<TotalRegistroResponse>(url).pipe(
      tap(res => {
        if (res.OK) {
          this._totalReportes = res.DATA!;
        }
      }),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );
  }

  getTotalReportesPorMes() {
    const url = `${this.baseUrl}/graficas/total-registros/mes`;
    let data: any;

    return this.http.get<RegistrosPorMesResponse>(url).pipe(
      tap(res => {
        if (res.OK) {
          data = this.splitDataResponse(res.CANTIDAD_REGISTRO_POR_MES_LINE!);
          this._totalReportesMesLineLabels = data.labels;
          this._totalReportesMesLineData = data.data;
        }
      }),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );
  }
  getTotalReportesPorAnnio() {
    const url = `${this.baseUrl}/graficas/total-registros/annio`;
    let data: any;

    return this.http.get<RegistrosPorAnnioResponse>(url).pipe(
      tap(res => {
        if (res.OK) {
          data = this.splitDataResponse(res.CANTIDAD_REGISTRO_POR_ANNIO_LINE!);
          this._totalReportesAnnioLineLabels = data.labels;
          this._totalReportesAnnioLineData = data.data;
        }
      }),
      map(res => res.OK),
      catchError(err => of(err.error.msg))
    );
  }

  splitDataResponse(chartInfo: ChartInfo[]) {
    let labels: string[] = [];
    let data: number[] = [];

    chartInfo.map(res => {
      labels.push(res.LABEL!)
      data.push(res.DATA)
    })

    return { labels, data };
  }


}
