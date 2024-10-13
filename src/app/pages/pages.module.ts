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
import { PlanificacionesComponent } from './planificacion-cultivo/planificaciones/planificaciones.component';
import { AlmacenesComponent } from './almacen/almacenes/almacenes.component';
import { CosechasComponent } from './cosecha/cosechas/cosechas.component';
import { EtapasComponent } from './etapa/etapas/etapas.component';
import { SemillasComponent } from './semilla/semillas/semillas.component';
import { FertilizantesComponent } from './fertilizante/fertilizantes/fertilizantes.component';
import { FrecuenciasComponent } from './frecuencia/frecuencias/frecuencias.component';
import { MantenimientosComponent } from './mantenimiento/mantenimientos/mantenimientos.component';
import { PlagasComponent } from './plaga/plagas/plagas.component';
import { SiembrasComponent } from './siembra/siembras/siembras.component';
import { ListaTerrenosComponent } from './terrenos/lista-terrenos/lista-terrenos.component';
import { TiposTerrenoComponent } from './tipo-terreno/tipos-terreno/tipos-terreno.component';
import { UnidadesMedidaComponent } from './unidad-medida/unidades-medida/unidades-medida.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';
import { RolComponent } from './rol/rol.component';
import { EstadoComponent } from './estado/estado.component';
import { EstadosComponent } from './estado/estados/estados.component';
import { RolesComponent } from './rol/roles/roles.component';
import { UsuariosComponent } from './usuario/usuarios/usuarios.component';



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
    PlanificacionesComponent,
    AlmacenesComponent,
    CosechasComponent,
    EtapasComponent,
    SemillasComponent,
    FertilizantesComponent,
    FrecuenciasComponent,
    MantenimientosComponent,
    PlagasComponent,
    SiembrasComponent,
    ListaTerrenosComponent,
    TiposTerrenoComponent,
    UnidadesMedidaComponent,
    UsuarioComponent,
    RolComponent,
    EstadoComponent,
    EstadosComponent,
    RolesComponent,
    UsuariosComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
