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
      nombre: 'Registro de trámite'
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
    {
      ruta: './asignacionroles',
      nombre: 'Asignacion de roles'
    },
    {
      ruta: './reportepersonal',
      nombre: 'Reporte Personal'
    },
    {
      ruta: './reportetramites',
      nombre: 'Reporte de Trámites'
    },
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
