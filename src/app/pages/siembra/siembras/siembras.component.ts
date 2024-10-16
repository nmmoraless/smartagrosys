import { Component, NgZone } from '@angular/core';
import { SiembraInterface } from '../../interfaces/siembra.interface';
import { SiembraService } from '../../services/siembra.service';
import { Router } from '@angular/router';
import { TerrenoService } from '../../services/terreno.service';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { forkJoin } from 'rxjs';
import { UnidadMedidaInterface } from '../../interfaces/unidad-medida.interface';
import { TerrenoInterface } from '../../interfaces/terreno.interface';

@Component({
  selector: 'app-siembras',
  templateUrl: './siembras.component.html',
  styleUrl: './siembras.component.css'
})
export class SiembrasComponent {

  public listaSiembraes: SiembraInterface[] = [];
  public unidadesMedida: UnidadMedidaInterface[] = [];
  public terrenos: TerrenoInterface[] = [];

  constructor( private _siembraService: SiembraService, private _terrenoService: TerrenoService, private _unidadesMedida: UnidadMedidaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
    const terrenos = this._terrenoService.getTerrenos();
    const siembras = this._siembraService.getSiembras();
    forkJoin([unidadesMedida, terrenos, siembras]).subscribe(([unidadesMedida, terrenos, siembras]) => {
      this.unidadesMedida = unidadesMedida;
      this.terrenos = terrenos;
      this.listaSiembraes = siembras;        
    });
    
  }

  public actualizarSiembra(id: number){
    this.router.navigateByUrl( '/siembra/editar/' + id );
  }

  public eliminarSiembra(id: number){
    this._siembraService.borrarSiembra(id).subscribe ( Siembra => {
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
    if (objeto == 'unidadesMedida') {
      let auxUnidadmedida = this.unidadesMedida.filter(medida => medida.id = id);
      label = auxUnidadmedida[0].Sigla;
    } else if (objeto == 'terrenos'){
      let auxTerreno = this.terrenos.filter(terreno => terreno.id = id);
      label = auxTerreno[0].Nombre;
    }
    return label;
  }

}
