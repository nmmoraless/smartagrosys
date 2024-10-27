import { Component, NgZone } from '@angular/core';
import { TerrenoInterface } from '../../interfaces/terreno.interface';
import { Router } from '@angular/router';
import { TerrenoService } from '../../services/terreno.service';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { TipoTerrenoService } from '../../services/tipo-terreno.service';
import { forkJoin } from 'rxjs';
import { UnidadMedidaInterface } from '../../interfaces/unidad-medida.interface';
import { TipoTerrenoInterface } from '../../interfaces/tipo-terreno.interface';

@Component({
  selector: 'app-lista-terrenos',
  templateUrl: './lista-terrenos.component.html',
  styleUrl: './lista-terrenos.component.css'
})
export class ListaTerrenosComponent {

  public listaTerrenos: TerrenoInterface[] = [];
  public unidadesMedida: UnidadMedidaInterface[] = [];
  public tiposTerrenos: TipoTerrenoInterface[] = [];

  constructor( private _terrenoService: TerrenoService, private _unidadesMedida: UnidadMedidaService, private _tiposTerreno: TipoTerrenoService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
    const tiposTerreno = this._tiposTerreno.getTiposTerrenos();
    const terrenos = this._terrenoService.getTerrenos();
    forkJoin([unidadesMedida, terrenos, tiposTerreno]).subscribe(([unidadesMedida, terrenos, tiposTerreno]) => {
      this.unidadesMedida = unidadesMedida;
      this.listaTerrenos = terrenos;
      this.tiposTerrenos = tiposTerreno;
    });

  }
  public actualizarTerreno(id: string){
    this.router.navigateByUrl( '/terreno/editar/' + id );
  }

  public eliminarTerreno(id: string){
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

  public definirLabel(id: string, objeto: string): string {
    let label: string = '';
    if (objeto == 'unidadesMedida') {
      let auxUnidadmedida = this.unidadesMedida.filter(medida => medida.id == id);
      label = auxUnidadmedida[0].Sigla;
    } else if (objeto == 'tiposTerreno'){
      let auxTerreno = this.tiposTerrenos.filter(tipoTerreno => tipoTerreno.id == id);
      label = auxTerreno[0].Descripcion;
    }
    return label;
  }

}
