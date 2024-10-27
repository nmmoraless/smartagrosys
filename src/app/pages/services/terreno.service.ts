import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';
import { TerrenoInterface } from '../interfaces/terreno.interface';

@Injectable({
  providedIn: 'root'
})
export class TerrenoService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getTerrenos(): Observable<TerrenoInterface[]> {
    return this.http.get<TerrenoInterface[]>( this.baseUrl + `/terrenos`);
  }

  getTerreno(idTerreno: string): Observable<TerrenoInterface[]> {
    return this.http.get<TerrenoInterface[]>( this.baseUrl + `/terrenos?id=${idTerreno}`);
  }

  agregarTerreno( terreno: TerrenoInterface ): Observable<TerrenoInterface> {
    return this.http.post<TerrenoInterface>( this.baseUrl + `/terrenos`, terreno)
  }

  actualizarTerreno( terreno: TerrenoInterface ): Observable<TerrenoInterface> {
    return this.http.put<TerrenoInterface>( this.baseUrl + `/terrenos/${terreno.id}`, terreno)
  }

  borrarTerreno(idTerreno: string): Observable<TerrenoInterface> {
    return this.http.delete<TerrenoInterface>( this.baseUrl + `/terrenos/${idTerreno}`);
  }
}
