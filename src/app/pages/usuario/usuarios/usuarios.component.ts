import { Component, NgZone } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { RolService } from '../../services/rol.service';
import { EstadoService } from '../../services/estado.service';
import { Router } from '@angular/router';
import { EstadoInterface } from '../../interfaces/estado.interface';
import { forkJoin } from 'rxjs';
import { RolInterface } from '../../interfaces/rol.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  public listaUsuarios: UsuarioInterface[] = [];
  public listaRoles: RolInterface[] = [];
  public listaEstados: EstadoInterface[] = [];

    constructor( private _usuario: UsuarioService, private _rol: RolService, private __estado: EstadoService, private router: Router, private ngZone: NgZone) { }
  
    ngOnInit(): void {
  
      const usuarios = this._usuario.getUsuarios();
      const rol = this._rol.getRoles();
      const estados = this.__estado.getEstados();
      forkJoin([usuarios, rol, estados]).subscribe(([usuarios, roles, estados]) => {
        this.listaUsuarios = usuarios;
        this.listaRoles = roles;
        this.listaEstados = estados;
      });
  
    }
    
    public actualizarUsuario(id: number){
      this.router.navigateByUrl( '/usuario/editar/' + id );
    }
  
    public eliminarUsuario(id: number){
      this._usuario.borrarUsuario(id).subscribe ( usuario => {
        //Recarga de componente actual
      setTimeout(() => {
        this.ngZone.run(() => {
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        });
      }, 500);
      })
    }
    public definirLabel(id: number, objeto: string): string {
      let label: string = '';
    
      if (objeto == 'usuarios') {
        let auxUsuario = this.listaUsuarios.find(usuario => usuario.id == id);
        if (auxUsuario) {  // Verifica si se encontró el usuario
          label = auxUsuario.Nombre; 
        }
      }
    
      return label;
    }    
    }
  
  