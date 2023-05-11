import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEntradaComponent } from './pages/registro-entrada/registro-entrada.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MantenimientoAreasComponent } from './pages/mantenimiento-areas/mantenimiento-areas.component';
import { MantenimientoTramitesComponent } from './pages/mantenimiento-tramites/mantenimiento-tramites.component';
import { MainComponent } from './pages/main/main.component';
import { RegistroTramiteComponent } from './pages/registro-tramite/registro-tramite.component';
import { AsignacionRolesComponent } from './pages/asignacion-roles/asignacion-roles.component';
import { ReporteTramitesComponent } from './pages/reporte-tramites/reporte-tramites.component';
import { ReportePersonalComponent } from './pages/reporte-personal/reporte-personal.component';
import { GraficosComponent } from './pages/graficos/graficos.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {path: 'inicio', component: InicioComponent},
      {path: 'registroentrada', component: RegistroEntradaComponent},
      {path: 'registrotramite', component: RegistroTramiteComponent},
      {path: 'mantenimientoareas', component: MantenimientoAreasComponent},
      {path: 'mantenimientotramites', component: MantenimientoTramitesComponent},
      {path: 'asignacionroles', component: AsignacionRolesComponent },
      {path: 'reportetramites', component: ReporteTramitesComponent },
      {path: 'reportepersonal', component: ReportePersonalComponent },
      {path: 'graficos', component: GraficosComponent },
      {path: '**', redirectTo: 'inicio'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SCTRoutingModule { }