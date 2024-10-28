import { Component, NgZone } from '@angular/core';
import { SiembraInterface } from '../../interfaces/siembra.interface';
import { SiembraService } from '../../services/siembra.service';
import { Router } from '@angular/router';
import { TerrenoService } from '../../services/terreno.service';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { forkJoin } from 'rxjs';
import { UnidadMedidaInterface } from '../../interfaces/unidad-medida.interface';
import { TerrenoInterface } from '../../interfaces/terreno.interface';
import { PlanificacionInterface } from '../../interfaces/planificacion.interface';
import { PlanificacionService } from '../../services/planificacion.service';

@Component({
  selector: 'app-siembras',
  templateUrl: './siembras.component.html',
  styleUrl: './siembras.component.css'
})
export class SiembrasComponent {
  public listaPlanificaciones: PlanificacionInterface[] = [];
  public listaSiembraes: SiembraInterface[] = [];
  public unidadesMedida: UnidadMedidaInterface[] = [];
  public terrenos: TerrenoInterface[] = [];

  constructor( private _siembraService: SiembraService, private _terrenoService: TerrenoService, private _planificacionService: PlanificacionService, private _unidadesMedida: UnidadMedidaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
    const terrenos = this._terrenoService.getTerrenos();
    const planificaciones = this._planificacionService.getPlanificaciones();
    const siembras = this._siembraService.getSiembras();
    forkJoin([unidadesMedida, terrenos, planificaciones, siembras]).subscribe(([unidadesMedida, terrenos, planificaciones, siembras]) => {
      this.unidadesMedida = unidadesMedida;
      this.terrenos = terrenos;
      this.listaPlanificaciones = planificaciones;
      this.listaSiembraes = siembras;
    });

  }

  public actualizarSiembra(id: string){
    this.router.navigateByUrl( '/siembra/editar/' + id );
  }

  public eliminarSiembra(id: string){
    this._siembraService.borrarSiembra(id).subscribe ( Siembra => {
      //Recarga de componente actual
    setTimeout(() => {
      this.ngZone.run(() => {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      });
    }, 500);
    })

  }

  public definirLabel(id: string, objeto: string): string {
    let label: string = '';
    if (objeto == 'unidadesMedida') {
      let auxUnidadmedida = this.unidadesMedida.filter(medida => medida.id = id);
      label = auxUnidadmedida[0].Sigla;
    } else if (objeto == 'terrenos'){
      let auxTerreno = this.terrenos.filter(terreno => terreno.id = id);
      label = auxTerreno[0].Nombre;
    } else if (objeto == 'planificaciones'){
      let auxPlanificacion = this.listaPlanificaciones.filter(planificacion => planificacion.id = id);
      label = auxPlanificacion[0].Nombre;
    }
    return label;
  }

}
