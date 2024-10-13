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

  agregarSiembra( Siembra: SiembraInterface ): Observable<SiembraInterface> {
    return this.http.post<SiembraInterface>( this.baseUrl + `/siembras`, Siembra)
  }

  actualizarSiembra( Siembra: SiembraInterface ): Observable<SiembraInterface> {
    return this.http.put<SiembraInterface>( this.baseUrl + `/siembras`, Siembra)
  }

  borrarSiembra(idSiembra: number): Observable<SiembraInterface> {
    return this.http.delete<SiembraInterface>( this.baseUrl + `/siembras?id=${idSiembra}`);
  }
}
