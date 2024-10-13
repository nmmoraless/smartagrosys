import { Component, NgZone } from '@angular/core';
import { TerrenoInterface } from '../../interfaces/terreno.interface';
import { Router } from '@angular/router';
import { TerrenoService } from '../../services/terreno.service';

@Component({
  selector: 'app-lista-terrenos',
  templateUrl: './lista-terrenos.component.html',
  styleUrl: './lista-terrenos.component.css'
})
export class ListaTerrenosComponent {

  public listaTerrenos: TerrenoInterface[] = [];

  constructor( private _terrenoService: TerrenoService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._terrenoService.getTerrenos().subscribe( data => {debugger
      this.listaTerrenos = data;
    })
    
  }

  public actualizarTerreno(id: number){
    this.router.navigateByUrl( '/terreno/editar/' + id );
  }

  public eliminarTerreno(id: number){
    this._terrenoService.borrarTerreno(id).subscribe ( terreno => {
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

  public definirUnidadMedada(id: number): string {debugger
    let unidadMedida: string = '';
    switch (id.toString()) {
      case '1':
        unidadMedida = 'Hectárea';
        break;
      case '2':
        unidadMedida = 'Kilometro';
        break;
      case '3':
        unidadMedida = 'Metro';
        break;
      default:
        unidadMedida = '';
    }
    return unidadMedida;
  }

  public definirTipoTerreno(id: number): string {debugger
    let tipoTerreno: string = '';
    switch (id.toString()) {
      case '1':
        tipoTerreno = 'Arcilloso';
        break;
      case '2':
        tipoTerreno = 'Seco';
        break;
      case '3':
        tipoTerreno = 'Pedregoso';
        break;
      default:
        tipoTerreno = '';
    }
    return tipoTerreno;
  }

}
