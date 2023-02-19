import { Component, OnInit } from '@angular/core';

interface MenuItem{
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
    #sidebar {
    height: 100%;
    width: 100%;
    max-width: 15%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: #00416B;
    overflow-x: hidden;
    }

    hr{
      color: white;
      margin-left: 10px;
      margin-right: 10px;
    }

    li{
      background-color: #00416B;
      color:white;
      border: none;
      border-radius: 7px;
      cursor: pointer;
      margin-left: 10px;
      margin-right: 10px;
    }

    `
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      ruta: './inicio',
      nombre: 'Inicio'
    },
    {
      ruta: './registroentrada',
      nombre: 'Registro de entrada'
    },
    {
      ruta: './mantenimientoareas',
      nombre: 'Mantenimiento de áreas'
    },
    {
      ruta: './mantenimientotramites',
      nombre: 'Mantenimiento de trámites'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
