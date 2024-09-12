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
import { CosechaComponent } from './cosecha/cosecha.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { EtapaComponent } from './etapa/etapa.component';
import { FrecuenciaComponent } from './frecuencia/frecuencia.component';
import { SemillaComponent } from './semilla/semilla.component';
import { TipoTerrenoComponent } from './tipo-terreno/tipo-terreno.component';
import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';



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
    CosechaComponent,
    AlmacenComponent,
    EtapaComponent,
    FrecuenciaComponent,
    SemillaComponent,
    TipoTerrenoComponent,
    UnidadMedidaComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
