import { Component, NgZone } from '@angular/core';
import { CosechaInterface } from '../../interfaces/cosecha.interface';
import { CosechaService } from '../../services/cosecha.service';
import { Router } from '@angular/router';
import { AlmacenInterface } from '../../interfaces/almacen.interface';
import { UnidadMedidaInterface } from '../../interfaces/unidad-medida.interface';
import { forkJoin } from 'rxjs';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-cosechas',
  templateUrl: './cosechas.component.html',
  styleUrl: './cosechas.component.css'
})
export class CosechasComponent {

  public listaCosechas: CosechaInterface[] = [];
  public listaAlmacenes: AlmacenInterface[] = [];
  public listaUnidadesMedida: UnidadMedidaInterface[] = [];

  constructor( private _cosechaservice: CosechaService, private _unidadesMedida: UnidadMedidaService, private _almacen: AlmacenService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
    const almacenes = this._almacen.getAlmacenes();
    forkJoin([unidadesMedida, almacenes]).subscribe(([unidadesMedida, almacenes]) => {
      this.listaUnidadesMedida = unidadesMedida;
      this.listaAlmacenes = almacenes;
    });

    this._cosechaservice.getCosechas().subscribe(cosechas => {
      this.listaCosechas = cosechas;
    })
  }

  public actualizarCosecha(id: string){
    this.router.navigateByUrl( '/cosecha/editar/' + id );
  }

  public eliminarCosecha(id: string){
    this._cosechaservice.borrarCosecha(id).subscribe ( cosecha => {
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

  public definirLabel(id: number | string, objeto: string): string {debugger
    let label: string = '';
    if (objeto == 'almacen') {
      let auxAlmacen = this.listaAlmacenes.filter(almacen => almacen.id == id);
      label = auxAlmacen[0].Nombre;
    } else if (objeto == 'unidadMedida') {
      let auxMedida = this.listaUnidadesMedida.filter(medida => medida.id == id);
      label = auxMedida[0].Sigla;
    }
    return label;
  }

}



