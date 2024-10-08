import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanificacionInterface } from '../interfaces/planificacion.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {

  constructor(private http: HttpClient) { }

  getPlanificaciones(): Observable<PlanificacionInterface[]> {
    return this.http.get<PlanificacionInterface[]>(`http://localhost:3000/planificacionesCultivo`);
  }

  getPlanificacion(idPlanificacion: number): Observable<PlanificacionInterface> {
    return this.http.get<PlanificacionInterface>(`http://localhost:3000/planificaciones?IdPlanificacion=${idPlanificacion}`);
  }

  agregarPlanificacion( planificacion: PlanificacionInterface ): Observable<PlanificacionInterface> {
    return this.http.post<PlanificacionInterface>(`http://localhost:3000/planificaciones`, planificacion)
  }

  actualizarPlanificacion( planificacion: PlanificacionInterface ): Observable<PlanificacionInterface> {
    return this.http.put<PlanificacionInterface>(`http://localhost:3000/planificaciones`, planificacion)
  }

  borrarPlanificacion(idPlanificacion: number): Observable<PlanificacionInterface> {
    return this.http.delete<PlanificacionInterface>(`http://localhost:3000/planificaciones?IdPlanificacion=${idPlanificacion}`);
  }
}
