import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';
import { AlmacenInterface } from '../interfaces/almacen.interface';


@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getAlmacenes(): Observable<AlmacenInterface[]> {
    return this.http.get<AlmacenInterface[]>( this.baseUrl + `/almacenes`);
  }

  getAlmacen(idAlmacen: string): Observable<AlmacenInterface[]> {
    return this.http.get<AlmacenInterface[]>( this.baseUrl + `/almacenes?id=${idAlmacen}`);
  }

  agregarAlmacen( Almacen: AlmacenInterface ): Observable<AlmacenInterface> {
    return this.http.post<AlmacenInterface>( this.baseUrl + `/almacenes`, Almacen)
  }

  actualizarAlmacen( Almacen: AlmacenInterface ): Observable<AlmacenInterface> {
    return this.http.put<AlmacenInterface>( this.baseUrl + `/almacenes/${Almacen.id}`, Almacen)
  }

  borrarAlmacen(idAlmacen: string): Observable<AlmacenInterface> {
    return this.http.delete<AlmacenInterface>( this.baseUrl + `/almacenes/${idAlmacen}`);
  }
}
