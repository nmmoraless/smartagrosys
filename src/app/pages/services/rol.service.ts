import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { RolInterface } from '../interfaces/rol.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<RolInterface[]> {
    return this.http.get<RolInterface[]>( this.baseUrl + `/roles`);
  }

  getRol(idRol: number): Observable<RolInterface[]> {
    return this.http.get<RolInterface[]>( this.baseUrl + `/roles?id=${idRol}`);
  }

  agregarRol( Rol: RolInterface ): Observable<RolInterface> {
    return this.http.post<RolInterface>( this.baseUrl + `/Roles`, Rol)
  }


  actualizarRol( Rol: RolInterface ): Observable<RolInterface> {
    return this.http.put<RolInterface>( this.baseUrl + `/Roles?id=${Rol.id}`, Rol)
  
  }

  borrarRol(idRol: number): Observable<RolInterface> {
    return this.http.delete<RolInterface>( this.baseUrl + `/Roles/${idRol}`);
  }
}

