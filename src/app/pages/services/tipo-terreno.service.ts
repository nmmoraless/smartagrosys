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

  getTiposTerrenos(): Observable<TipoTerrenoInterface[]> {
    return this.http.get<TipoTerrenoInterface[]>( this.baseUrl + `/tiposTerreno`);
  }

  getTipoTerreno(idTipoTerreno: string): Observable<TipoTerrenoInterface[]> {
    return this.http.get<TipoTerrenoInterface[]>( this.baseUrl + `/tiposTerreno?id=${idTipoTerreno}`);
  }

  agregarTipoTerreno( TipoTerreno: TipoTerrenoInterface ): Observable<TipoTerrenoInterface> {
    return this.http.post<TipoTerrenoInterface>( this.baseUrl + `/tiposTerreno`, TipoTerreno)
  }

  actualizarTipoTerreno( TipoTerreno: TipoTerrenoInterface ): Observable<TipoTerrenoInterface> {
    return this.http.put<TipoTerrenoInterface>( this.baseUrl + `/tiposTerreno/${TipoTerreno.id}`, TipoTerreno)
  }

  borrarTipoTerreno(idTipoTerreno: string): Observable<TipoTerrenoInterface> {
    return this.http.delete<TipoTerrenoInterface>( this.baseUrl + `/tiposTerreno/${idTipoTerreno}`);
  }
  
}
