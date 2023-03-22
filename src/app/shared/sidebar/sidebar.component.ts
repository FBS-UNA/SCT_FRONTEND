import { Component, OnInit } from '@angular/core';

interface MenuItem{
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      ruta: './inicio',
      nombre: 'Inicio'
    },
    {
      ruta: './registrotramite',
      nombre: 'Registro de tramite'
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
