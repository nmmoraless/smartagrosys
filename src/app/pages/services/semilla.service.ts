import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SemillaInterface } from '../interfaces/semilla.interface';

@Injectable({
  providedIn: 'root'
})
export class SemillaService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getSemillas(): Observable<SemillaInterface[]> {
    return this.http.get<SemillaInterface[]>( this.baseUrl + `/semillas`);
  }

  getSemilla(idSemilla: string): Observable<SemillaInterface[]> {
    return this.http.get<SemillaInterface[]>( this.baseUrl + `/semillas?id=${idSemilla}`);
  }

  agregarSemilla( Semilla: SemillaInterface ): Observable<SemillaInterface> {
    return this.http.post<SemillaInterface>( this.baseUrl + `/semillas`, Semilla)
  }

  actualizarSemilla( Semilla: SemillaInterface ): Observable<SemillaInterface> {
    return this.http.put<SemillaInterface>( this.baseUrl + `/semillas/${Semilla.id}`, Semilla)
  }

  borrarSemilla(idSemilla: string): Observable<SemillaInterface> {
    return this.http.delete<SemillaInterface>( this.baseUrl + `/semillas/${idSemilla}`);
  }
}
