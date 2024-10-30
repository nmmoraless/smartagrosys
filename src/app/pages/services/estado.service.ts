import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoInterface } from '../interfaces/estado.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {


  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getEstados(): Observable<EstadoInterface[]> {
    return this.http.get<EstadoInterface[]>( this.baseUrl + `/estados`);
  }

  getEstado(idEstado: string): Observable<EstadoInterface[]> {
    return this.http.get<EstadoInterface[]>( this.baseUrl + `/estados?id=${idEstado}`);
  }

  agregarEstado( estado: EstadoInterface ): Observable<EstadoInterface> {
    return this.http.post<EstadoInterface>( this.baseUrl + `/estados`, estado)
  }

  actualizarEstado( estado: EstadoInterface ): Observable<EstadoInterface> {
    return this.http.put<EstadoInterface>( this.baseUrl + `/estados/${estado.id}`, estado)
  }

  borrarEstado(idEstado: string): Observable<EstadoInterface> {
    return this.http.delete<EstadoInterface>( this.baseUrl + `/estados/${idEstado}`);
  }
}
