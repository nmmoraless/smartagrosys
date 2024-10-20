import { Injectable } from '@angular/core';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<UsuarioInterface[]> {
    return this.http.get<{ usuarios: UsuarioInterface[] }>(this.baseUrl + `/Usuarios`).pipe(
        map((response: { usuarios: any; }) => response.usuarios)  );
  }

  getUsuario(idUsuario: number): Observable<UsuarioInterface[]> {
    return this.http.get<UsuarioInterface[]>( this.baseUrl + `/Usuarios?id=${idUsuario}`);
  }

  agregarUsuario( Usuario: UsuarioInterface ): Observable<UsuarioInterface> {
    return this.http.post<UsuarioInterface>( this.baseUrl + `/Usuarios`, Usuario)
  }

  actualizarUsuario( Usuario: UsuarioInterface ): Observable<UsuarioInterface> {
    return this.http.put<UsuarioInterface>( this.baseUrl + `/Usuarios?id=${Usuario.id}`, Usuario)

  }

  borrarUsuario(idUsuario: number): Observable<UsuarioInterface> {
    return this.http.delete<UsuarioInterface>( this.baseUrl + `/Usuarios/${idUsuario}`);
  }
}
