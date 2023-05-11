import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styles: [
  ]
})
export class GraficosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  public colors: Color[] = [
    '#F69A34',
    '#D46C2C',
    '#EB653C',
    '#D43B2C',
    '#F6345B',
  ];

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales', 'Amazon', 'El Marino' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100, 150, 300 ],
        backgroundColor: this.colors,
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
