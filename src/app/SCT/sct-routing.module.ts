import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEntradaComponent } from './pages/registro-entrada/registro-entrada.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MantenimientoAreasComponent } from './pages/mantenimiento-areas/mantenimiento-areas.component';
import { MantenimientoTramitesComponent } from './pages/mantenimiento-tramites/mantenimiento-tramites.component';
import { MainComponent } from './pages/main/main.component';
import { RegistroTramiteComponent } from './pages/registro-tramite/registro-tramite.component';

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
      {path: '**', redirectTo: 'inicio'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SCTRoutingModule { }
