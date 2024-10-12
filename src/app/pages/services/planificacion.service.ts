import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanificacionInterface } from '../interfaces/planificacion.interface';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getPlanificaciones(): Observable<PlanificacionInterface[]> {
    return this.http.get<PlanificacionInterface[]>( this.baseUrl + `/planificacionesCultivo`);
  }

  getPlanificacion(idPlanificacion: number): Observable<PlanificacionInterface> {
    return this.http.get<PlanificacionInterface>( this.baseUrl + `/planificacionesCultivo?IdPlanificacion=${idPlanificacion}`);
  }

  agregarPlanificacion( planificacion: PlanificacionInterface ): Observable<PlanificacionInterface> {
    return this.http.post<PlanificacionInterface>( this.baseUrl + `/planificacionesCultivo`, planificacion)
  }

  actualizarPlanificacion( planificacion: PlanificacionInterface ): Observable<PlanificacionInterface> {
    return this.http.put<PlanificacionInterface>( this.baseUrl + `/planificacionesCultivo`, planificacion)
  }

  borrarPlanificacion(idPlanificacion: number): Observable<PlanificacionInterface> {
    return this.http.delete<PlanificacionInterface>( this.baseUrl + `/planificacionesCultivo?IdPlanificacion=${idPlanificacion}`);
  }
}
