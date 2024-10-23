import { Component, NgZone } from '@angular/core';
import { TipoTerrenoInterface } from '../../interfaces/tipo-terreno.interface';
import { TipoTerrenoService } from '../../services/tipo-terreno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipos-terreno',
  templateUrl: './tipos-terreno.component.html',
  styleUrl: './tipos-terreno.component.css'
})
export class TiposTerrenoComponent {

  public listaTiposTerreno: TipoTerrenoInterface[] = [];

  constructor( private _tipoterrenoservice: TipoTerrenoService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._tipoterrenoservice.getTiposTerrenos().subscribe(tiposterreno => {
      this.listaTiposTerreno = tiposterreno;
    })
  }

  public actualizarTipoTerreno(id: number){ 
    this.router.navigateByUrl( '/tipoterreno/editar/' + id );
  }

  public eliminarTipoTerreno(id: number){
    this._tipoterrenoservice.borrarTipoTerreno(id).subscribe ( tiposterreno => {
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

}




