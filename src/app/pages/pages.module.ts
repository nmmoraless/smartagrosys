import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanificacionCultivoComponent } from './planificacion-cultivo/planificacion-cultivo.component';
import { TerrenosComponent } from './terrenos/terrenos.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SiembraComponent } from './siembra/siembra.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { FertilizanteComponent } from './fertilizante/fertilizante.component';
import { PlagaComponent } from './plaga/plaga.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    PlanificacionCultivoComponent,
    TerrenosComponent,
    PagesComponent,
    SiembraComponent,
    MantenimientoComponent,
    FertilizanteComponent,
    PlagaComponent, 
  ],
  exports: [
    DashboardComponent, 
    PlanificacionCultivoComponent,
    TerrenosComponent, 
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
