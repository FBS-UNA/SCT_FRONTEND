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
    width: 240px;
    position: fixed;
    z-index: 1;
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
      ruta: '/inicio',
      nombre: 'Inicio'
    },
    {
      ruta: '/vigilante',
      nombre: 'Registro de entrada'
    },
    {
      ruta: '/admin/mantenimientoDeAreas',
      nombre: 'Mantenimiento de áreas'
    },
    {
      ruta: '/admin/mantenimientoDeTramites',
      nombre: 'Mantenimiento de trámites'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
