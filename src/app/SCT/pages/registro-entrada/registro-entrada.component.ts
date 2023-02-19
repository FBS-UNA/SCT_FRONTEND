import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styles: [
    `
    .centrarCaja{
    position: absolute;
    top: 50%;
    left: 50%;
 }
    `
  ]
})
export class RegistroEntradaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
