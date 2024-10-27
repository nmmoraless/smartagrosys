import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { UnidadMedidaInterface } from '../interfaces/unidad-medida.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  
  private baseUrl: string = environments.baseUrl;
  
  constructor(private http: HttpClient) { }

  getUnidadesMedidas(): Observable<UnidadMedidaInterface[]> {
    return this.http.get<UnidadMedidaInterface[]>( this.baseUrl + `/unidadesMedida`);
  }

  getUnidadesMedida(idUnidadesMedida: string): Observable<UnidadMedidaInterface[]> {
    return this.http.get<UnidadMedidaInterface[]>( this.baseUrl + `/unidadesMedida?id=${idUnidadesMedida}`);
  }

  agregarUnidadesMedida( UnidadesMedida: UnidadMedidaInterface ): Observable<UnidadMedidaInterface> {
    return this.http.post<UnidadMedidaInterface>( this.baseUrl + `/unidadesMedida`, UnidadesMedida)
  }

  actualizarUnidadesMedida( UnidadesMedida: UnidadMedidaInterface ): Observable<UnidadMedidaInterface> {
    return this.http.put<UnidadMedidaInterface>( this.baseUrl + `/unidadesMedida`, UnidadesMedida)
  }

  borrarUnidadesMedida(idUnidadesMedida: string): Observable<UnidadMedidaInterface> {
    return this.http.delete<UnidadMedidaInterface>( this.baseUrl + `/unidadesMedida?id=${idUnidadesMedida}`);
  }
}
