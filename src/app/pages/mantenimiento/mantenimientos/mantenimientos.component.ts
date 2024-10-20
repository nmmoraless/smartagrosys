import { Component, NgZone } from '@angular/core';
import { FrecuenciaInterface } from '../../interfaces/frecuencia.interface';
import { SiembraInterface } from '../../interfaces/siembra.interface';
import { FertilizanteInterface } from '../../interfaces/fertilizante.interface';
import { PlagaInterface } from '../../interfaces/plaga.interface';
import { MantenimientoInterface } from '../../interfaces/mantenimiento.interface';
import { Router } from '@angular/router';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { SiembraService } from '../../services/siembra.service';
import { FrecuenciaService } from '../../services/frecuencia.service';
import { FertilizanteService } from '../../services/fertilizante.service';
import { PlagaService } from '../../services/plaga.service';
import { forkJoin } from 'rxjs';
import { TerrenoInterface } from '../../interfaces/terreno.interface';
import { PlanificacionInterface } from '../../interfaces/planificacion.interface';
import { TerrenoService } from '../../services/terreno.service';
import { PlanificacionService } from '../../services/planificacion.service';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrl: './mantenimientos.component.css'
})
export class MantenimientosComponent {

  public listaSiembras: SiembraInterface[] = [];
  public listaTerrenos: TerrenoInterface[] = [];
  public listaPlanificaciones: PlanificacionInterface[] = [];
  public listaFrecuencias: FrecuenciaInterface[] = [];
  public listaFertilizantes: FertilizanteInterface[] = [];
  public listaPlagas: PlagaInterface[] = [];
  public listaMantenimientos: MantenimientoInterface[] = [];

  constructor( private _mantenimiento: MantenimientoService, private _siembra: SiembraService, private _frecuencia: FrecuenciaService, private _fertilizante: FertilizanteService, private _plaga: PlagaService, private _terreno: TerrenoService, private _planificacion: PlanificacionService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    const siembras = this._siembra.getSiembras();
    const frecuencias = this._frecuencia.getFrecuencias();
    const fertilizantes = this._fertilizante.getFertilizantes();
    const plagas = this._plaga.getPlagas();
    const terrenos = this._terreno.getTerrenos();
    const planificaciones = this._planificacion.getPlanificaciones();
    const mantenimientos = this._mantenimiento.getMantenimientos();

    forkJoin([siembras, frecuencias, fertilizantes, plagas, terrenos, planificaciones, mantenimientos]).subscribe(([siembras, frecuencias, fertilizantes, plagas, terrenos, planificaciones, mantenimientos]) => {
      this.listaSiembras = siembras;
      this.listaFrecuencias = frecuencias;
      this.listaFertilizantes = fertilizantes;
      this.listaPlagas = plagas;
      this.listaTerrenos = terrenos;
      this.listaPlanificaciones = planificaciones;
      this.listaMantenimientos = mantenimientos;
    });
  }

  public actualizarMantenimiento(id: number){
    this.router.navigateByUrl( '/mantenimiento/editar/' + id );
  }

  public eliminarMantenimiento(id: number){
    this._mantenimiento.borrarMantenimiento(id).subscribe ( mantenimiento => {
      //Recarga de componente actual
    setTimeout(() => {
      this.ngZone.run(() => {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      });
    }, 100);
    })

  }

  public definirLabel(id: number, objeto: string): string {
    let label: string = '';
    if (objeto == 'fertilizante') {
      let auxFertilizante = this.listaFertilizantes.filter(fertilizante => fertilizante.id == id);
      label = auxFertilizante[0].Nombre;
    } else if (objeto == 'frecuencia'){
      let auxFrecuencia = this.listaFrecuencias.filter(frecuencia => frecuencia.id == id);
      label = auxFrecuencia[0].Descripcion;
    } else if(objeto == 'plaga'){
      let auxPlaga = this.listaPlagas.filter(plaga => plaga.id == id);
      label = auxPlaga[0].Nombre;
    } else if(objeto == 'terreno'){
      let auxSiembra = this.listaSiembras.filter(siembra => siembra.id == id);
      let auxTerreno = this.listaTerrenos.filter(terreno => terreno.id == auxSiembra[0].IdTerreno);
      label = auxTerreno[0].Nombre;
    } else if(objeto == 'planificacion'){
      let auxSiembra = this.listaSiembras.filter(siembra => siembra.id == id);
      let auxPlanificacion = this.listaPlanificaciones.filter(planificacion => planificacion.id.toString() == auxSiembra[0].IdPlanificacionCultivo);
      label = auxPlanificacion[0].Nombre;
    }
    return label;
  }

}
