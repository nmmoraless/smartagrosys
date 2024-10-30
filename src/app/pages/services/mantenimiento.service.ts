import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { MantenimientoInterface } from '../interfaces/mantenimiento.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getMantenimientos(): Observable<MantenimientoInterface[]> {
    return this.http.get<MantenimientoInterface[]>( this.baseUrl + `/mantenimientos`);
  }

  getMantenimiento(idMantenimiento: string): Observable<MantenimientoInterface[]> {
    return this.http.get<MantenimientoInterface[]>( this.baseUrl + `/mantenimientos?id=${idMantenimiento}`);
  }

  agregarMantenimiento( mantenimiento: MantenimientoInterface ): Observable<MantenimientoInterface> {
    return this.http.post<MantenimientoInterface>( this.baseUrl + `/mantenimientos`, mantenimiento)
  }

  actualizarMantenimiento( mantenimiento: MantenimientoInterface ): Observable<MantenimientoInterface> {
    return this.http.put<MantenimientoInterface>( this.baseUrl + `/mantenimientos/${mantenimiento.id}`, mantenimiento)
  }

  borrarMantenimiento(idMantenimiento: string): Observable<MantenimientoInterface> {
    return this.http.delete<MantenimientoInterface>( this.baseUrl + `/mantenimientos/${idMantenimiento}`);
  }
}
