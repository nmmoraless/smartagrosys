import { Component } from '@angular/core';
import { PlanificacionInterface } from '../../interfaces/planificacion.interface';
import { PlanificacionService } from '../../services/planificacion.service';

@Component({
  selector: 'app-planificaciones',
  templateUrl: './planificaciones.component.html',
  styleUrl: './planificaciones.component.css'
})
export class PlanificacionesComponent {

  public listaPlanificaciones: PlanificacionInterface[] = [];

  constructor( private _planificacionService: PlanificacionService) { }

  ngOnInit(): void {

    this._planificacionService.getPlanificaciones().subscribe( data => {debugger
      this.listaPlanificaciones = data;
    })
    
  }

}
