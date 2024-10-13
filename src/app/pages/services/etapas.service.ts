import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EtapaInterface } from '../interfaces/etapa.interface';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EtapasService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getEtapas(): Observable<EtapaInterface[]> {
    return this.http.get<EtapaInterface[]>( this.baseUrl + `/etapas`);
  }

  getEtapa(idEtapa: number): Observable<EtapaInterface[]> {
    return this.http.get<EtapaInterface[]>( this.baseUrl + `/etapas?id=${idEtapa}`);
  }

  agregarEtapa( etapa: EtapaInterface ): Observable<EtapaInterface> {
    return this.http.post<EtapaInterface>( this.baseUrl + `/etapas`, etapa)
  }

  actualizarEtapa( etapa: EtapaInterface ): Observable<EtapaInterface> {
    return this.http.put<EtapaInterface>( this.baseUrl + `/etapas`, etapa)
  }

  borrarEtapa(idEtapa: number): Observable<EtapaInterface> {
    return this.http.delete<EtapaInterface>( this.baseUrl + `/etapas?id=${idEtapa}`);
  }
}
