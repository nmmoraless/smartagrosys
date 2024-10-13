import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoTerrenoInterface } from '../interfaces/tipo-terreno.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoTerrenoService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getTipoTerrenos(): Observable<TipoTerrenoInterface[]> {
    return this.http.get<TipoTerrenoInterface[]>( this.baseUrl + `/TiposTerreno`);
  }

  getTipoTerreno(idTipoTerreno: number): Observable<TipoTerrenoInterface[]> {
    return this.http.get<TipoTerrenoInterface[]>( this.baseUrl + `/TiposTerreno?id=${idTipoTerreno}`);
  }

  agregarTipoTerreno( TipoTerreno: TipoTerrenoInterface ): Observable<TipoTerrenoInterface> {
    return this.http.post<TipoTerrenoInterface>( this.baseUrl + `/TiposTerreno`, TipoTerreno)
  }

  actualizarTipoTerreno( TipoTerreno: TipoTerrenoInterface ): Observable<TipoTerrenoInterface> {
    return this.http.put<TipoTerrenoInterface>( this.baseUrl + `/TiposTerreno`, TipoTerreno)
  }

  borrarTipoTerreno(idTipoTerreno: number): Observable<TipoTerrenoInterface> {
    return this.http.delete<TipoTerrenoInterface>( this.baseUrl + `/TiposTerreno?id=${idTipoTerreno}`);
  }
  
}
