import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<UsuarioInterface[]> {
    return this.http.get<UsuarioInterface[]>( this.baseUrl + `/usuarios`);
  }

  getUsuario(idUsuario: string): Observable<UsuarioInterface[]> {
    return this.http.get<UsuarioInterface[]>( this.baseUrl + `/usuarios?id=${idUsuario}`);
  }

  agregarUsuario( Usuario: UsuarioInterface ): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>( this.baseUrl + `/usuarios`, Usuario)
  }

  actualizarUsuario( Usuario: UsuarioInterface ): Observable<UsuarioInterface> {
    return this.http.put<UsuarioInterface>( this.baseUrl + `/usuarios?id=${Usuario.id}`, Usuario)

  }

  borrarUsuario(idUsuario: string): Observable<UsuarioInterface> {
    return this.http.delete<UsuarioInterface>( this.baseUrl + `/usuarios/${idUsuario}`);
  }
}
