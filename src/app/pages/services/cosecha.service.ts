import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { CosechaInterface } from '../interfaces/cosecha.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CosechaService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getCosechas(): Observable<CosechaInterface[]> {
    return this.http.get<CosechaInterface[]>( this.baseUrl + `/cosechas`);
  }

  getCosecha(idCosecha: number): Observable<CosechaInterface[]> {
    return this.http.get<CosechaInterface[]>( this.baseUrl + `/cosechas?id=${idCosecha}`);
  }

  agregarCosecha( Cosecha: CosechaInterface ): Observable<CosechaInterface> {
    return this.http.post<CosechaInterface>( this.baseUrl + `/cosechas`, Cosecha)
  }

  actualizarCosecha( Cosecha: CosechaInterface ): Observable<CosechaInterface> {
    return this.http.put<CosechaInterface>( this.baseUrl + `/cosechas`, Cosecha)
  }

  borrarCosecha(idCosecha: number): Observable<CosechaInterface> {
    return this.http.delete<CosechaInterface>( this.baseUrl + `/cosechas?id=${idCosecha}`);
  }
}
