import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styles: [
  ]
})
export class GraficosComponent implements OnInit {

  tramitesDonut: any;
  tramitesDonutLabels: string[] = [];
  tramitesDonutData: number[] = [];

  areasDonut: any;
  areasDonutLabels: string[] = [];
  areasDonutData: number[] = [];

  reportePorMesLine: any;
  reportePorMesLineLabels: string[] = [];
  reportePorMesLineData: number[] = [];

  reportePorAnnioLine: any;
  reportePorAnnioLineLabels: string[] = [];
  reportePorAnnioLineData: number[] = [];

  totalReportes : number = 0;

  public colors: Color[] = [
    '#00416B',
    '#FEBE10',
    '#DB4252',
    '#FC9500',
    '#A1CE57',
  ];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.cargarTotalDeReportes();
    this.cargarTramitesDonut();
    this.cargarAreasDonut();
    this.cargarReportePorMesLine();
    this.cargarReportePorAnnioLine();
  }

  cargarTotalDeReportes(){
    this.chartService.getTotalReportes().subscribe(OK=>{
      if(OK){
        this.totalReportes = this.chartService.totalReportes;
      }
    });
  }

  cargarTramitesDonut() {
    this.chartService.getTramitesDonut().subscribe(OK => {
      if (OK) {
        this.tramitesDonutLabels = this.chartService.tramitesDonutLabels;
        this.tramitesDonutData = this.chartService.tramitesDonutData;
        this.tramitesDonut = {
          labels: this.tramitesDonutLabels,
          datasets: [
            {
              data: this.tramitesDonutData,
              backgroundColor: this.colors
            }
          ]
        };
      }
    })
  }

  cargarAreasDonut() {
    this.chartService.getAreasDonut().subscribe(OK => {
      if (OK) {
        this.areasDonutLabels = this.chartService.areasDonutLabels;
        this.areasDonutData = this.chartService.areasDonutData;
        this.areasDonut = {
          labels: this.areasDonutLabels,
          datasets: [
            {
              data: this.areasDonutData,
              backgroundColor: this.colors
            }
          ]
        };
      }
    })
  }

  cargarReportePorMesLine() {
    this.chartService.getTotalReportesPorMes().subscribe(OK => {
      if (OK) {
        this.reportePorMesLineLabels = this.chartService.totalReportesMesLabels;
        this.reportePorMesLineData = this.chartService.totalReportesMesData;
        this.reportePorMesLine = {
          labels: this.reportePorMesLineLabels,
          datasets: [
            {
              label: 'Concurrencia Mensual',
              data: this.reportePorMesLineData,
              fill: false,
              borderColor: '#DB4252',
              tension: .6
            }
          ]
        };
      }
    })
  }

  cargarReportePorAnnioLine() {
    this.chartService.getTotalReportesPorAnnio().subscribe(OK => {
      if (OK) {
        this.reportePorAnnioLineLabels = this.chartService.totalReportesAnnioLabels;
        this.reportePorAnnioLineData = this.chartService.totalReportesAnnioData;
        this.reportePorAnnioLine = {
          labels: this.reportePorAnnioLineLabels,
          datasets: [
            {
              label: 'Concurrencia Anual',
              data: this.reportePorAnnioLineData,
              fill: false,
              borderColor: '#FC9500',
              tension: .6
            }
          ]
        };
      }
    })
  }


  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


}



