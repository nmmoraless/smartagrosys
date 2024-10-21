import { Component, NgZone } from '@angular/core';
import { RolInterface } from '../../interfaces/rol.interface';
import { RolService } from '../../services/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  public listaRoles: RolInterface[] = [];

  constructor(
    private _RolService: RolService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this._RolService.getRoles().subscribe((roles) => {
      this.listaRoles = roles;
    });
  }

  public actualizarRol(id: number) {
    this.router.navigateByUrl('/rol/editar/' + id);
  }

  public eliminarRol(id: number) {
    this._RolService.borrarRol(id).subscribe((rol) => {
      //Recarga de componente actual
      setTimeout(() => {
        this.ngZone.run(() => {
          const currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        });
      }, 500);
    });
  }
}
