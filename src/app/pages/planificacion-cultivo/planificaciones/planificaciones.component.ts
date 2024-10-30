import { Component, NgZone } from '@angular/core';
import { PlanificacionInterface } from '../../interfaces/planificacion.interface';
import { PlanificacionService } from '../../services/planificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planificaciones',
  templateUrl: './planificaciones.component.html',
  styleUrl: './planificaciones.component.css'
})
export class PlanificacionesComponent {

  public listaPlanificaciones: PlanificacionInterface[] = [];

  constructor( private _planificacionService: PlanificacionService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._planificacionService.getPlanificaciones().subscribe( data => {debugger
      this.listaPlanificaciones = data;
    })
    
  }

  public actualizarPlanificacion(id: string){
    this.router.navigateByUrl( '/planificacion/editar/' + id );
  }

  public eliminarPlanificacion(id: string){
    this._planificacionService.borrarPlanificacion(id).subscribe ( planificacion => {
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

  public definirEtapa(id: string): string {
    let etapa: string = '';
    switch (id.toString()) {
      case '1':
        etapa = 'Preparación del terreno';
        break;
      case '2':
        etapa = 'Siembra';
        break;
      case '3':
        etapa = 'Cosecha';
        break;
      case '4':
        etapa = 'Postcosecha';
        break;
      default:
        etapa = '';
    }
    return etapa;
  }

}
