import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiembraInterface } from '../interfaces/siembra.interface';

@Injectable({
  providedIn: 'root'
})
export class SiembraService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getSiembras(): Observable<SiembraInterface[]> {
    return this.http.get<SiembraInterface[]>( this.baseUrl + `/siembras`);
  }

  getSiembra(idSiembra: number): Observable<SiembraInterface[]> {
    return this.http.get<SiembraInterface[]>( this.baseUrl + `/siembras?id=${idSiembra}`);
  }

  agregarSiembra( siembra: SiembraInterface ): Observable<SiembraInterface> {
    return this.http.post<SiembraInterface>( this.baseUrl + `/siembras`, siembra)
  }

  actualizarSiembra( siembra: SiembraInterface ): Observable<SiembraInterface> {
    return this.http.put<SiembraInterface>( this.baseUrl + `/siembras/${siembra.id}`, siembra)
  }

  borrarSiembra(idSiembra: number): Observable<SiembraInterface> {
    return this.http.delete<SiembraInterface>( this.baseUrl + `/siembras?id=${idSiembra}`);
  }
}
