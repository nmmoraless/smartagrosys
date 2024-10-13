import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { FertilizanteInterface } from '../interfaces/fertilizante.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FertilizanteService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getFertilizantes(): Observable<FertilizanteInterface[]> {
    return this.http.get<FertilizanteInterface[]>( this.baseUrl + `/fertilizantes`);
  }

  getFertilizante(idFertilizante: number): Observable<FertilizanteInterface[]> {
    return this.http.get<FertilizanteInterface[]>( this.baseUrl + `/fertilizantes?id=${idFertilizante}`);
  }

  agregarFertilizante( Fertilizante: FertilizanteInterface ): Observable<FertilizanteInterface> {
    return this.http.post<FertilizanteInterface>( this.baseUrl + `/fertilizantes`, Fertilizante)
  }

  actualizarFertilizante( Fertilizante: FertilizanteInterface ): Observable<FertilizanteInterface> {
    return this.http.put<FertilizanteInterface>( this.baseUrl + `/fertilizantes`, Fertilizante)
  }

  borrarFertilizante(idFertilizante: number): Observable<FertilizanteInterface> {
    return this.http.delete<FertilizanteInterface>( this.baseUrl + `/fertilizantes?id=${idFertilizante}`);
  }
}
