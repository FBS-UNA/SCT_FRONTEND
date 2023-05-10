import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  rutasVigilante: MenuItem[] = [
    {
      ruta: './registroentrada',
      nombre: 'Registro de entrada'
    }
  ]

  rutasAdministrativos: MenuItem[] = [
    {
      ruta: './registrotramite',
      nombre: 'Registro de trámite'
    }
  ]

  rutasAdministrador: MenuItem[] = [
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
      ruta: './reportetramites',
      nombre: 'Reporte de Trámites'
    }
  ]

  menuItems: MenuItem[] = [
    {
      ruta: './inicio',
      nombre: 'Inicio'
    }
  ];

  constructor() { 
    this.permitirVerRutas()
  }

  ngOnInit(): void {
  }

  permitirVerRutas(){

    const roles = sessionStorage.getItem('roles');
    
    if(roles?.includes('ADMINISTRADOR')){
      this.menuItems = this.menuItems.concat(this.rutasAdministrador)
      this.menuItems = this.menuItems.concat(this.rutasAdministrativos)
      this.menuItems = this.menuItems.concat(this.rutasVigilante)
      return;
    }
    if(roles?.includes('VIGILANTE')){
      this.menuItems = this.menuItems.concat(this.rutasVigilante)
    }
    else{      
      this.menuItems = this.menuItems.concat(this.rutasAdministrativos)
    }

    

  }

}
