import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlagaInterface } from '../interfaces/plaga.interface';

@Injectable({
  providedIn: 'root'
})
export class PlagaService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getPlagas(): Observable<PlagaInterface[]> {
    return this.http.get<PlagaInterface[]>( this.baseUrl + `/plagas`);
  }

  getPlaga(idPlaga: string): Observable<PlagaInterface[]> {
    return this.http.get<PlagaInterface[]>( this.baseUrl + `/plagas?id=${idPlaga}`);
  }

  agregarPlaga( Plaga: PlagaInterface ): Observable<PlagaInterface> {
    return this.http.post<PlagaInterface>( this.baseUrl + `/plagas`, Plaga)
  }

  actualizarPlaga( Plaga: PlagaInterface ): Observable<PlagaInterface> {
    return this.http.put<PlagaInterface>( this.baseUrl + `/plagas`, Plaga)
  }

  borrarPlaga(idPlaga: string): Observable<PlagaInterface> {
    return this.http.delete<PlagaInterface>( this.baseUrl + `/plagas?id=${idPlaga}`);
  }
}
