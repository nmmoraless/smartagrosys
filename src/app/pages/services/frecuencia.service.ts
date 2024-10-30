import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { FrecuenciaInterface } from '../interfaces/frecuencia.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrecuenciaService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getFrecuencias(): Observable<FrecuenciaInterface[]> {
    return this.http.get<FrecuenciaInterface[]>( this.baseUrl + `/frecuencias`);
  }

  getFrecuencia(idFrecuencia: string): Observable<FrecuenciaInterface[]> {
    return this.http.get<FrecuenciaInterface[]>( this.baseUrl + `/frecuencias?id=${idFrecuencia}`);
  }

  agregarFrecuencia( Frecuencia: FrecuenciaInterface ): Observable<FrecuenciaInterface> {
    return this.http.post<FrecuenciaInterface>( this.baseUrl + `/frecuencias`, Frecuencia)
  }

  actualizarFrecuencia( Frecuencia: FrecuenciaInterface ): Observable<FrecuenciaInterface> {
    return this.http.put<FrecuenciaInterface>( this.baseUrl + `/frecuencias/${Frecuencia.id}`, Frecuencia)
  }

  borrarFrecuencia(idFrecuencia: string): Observable<FrecuenciaInterface> {
    return this.http.delete<FrecuenciaInterface>( this.baseUrl + `/frecuencias/${idFrecuencia}`);
  }
}
