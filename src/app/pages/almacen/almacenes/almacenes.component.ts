import { Component, NgZone } from '@angular/core';
import { AlmacenInterface } from '../../interfaces/almacen.interface';
import { AlmacenService } from '../../services/almacen.service';
import { Router } from '@angular/router';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { forkJoin } from 'rxjs';
import { UnidadMedidaInterface } from '../../interfaces/unidad-medida.interface';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrl: './almacenes.component.css'
})
export class AlmacenesComponent {
  public listaAlmacenes: AlmacenInterface[] = [];
  public listaUnidadesMedida: UnidadMedidaInterface[] = [];

  constructor( private _almacenservice: AlmacenService, private _unidadesMedida: UnidadMedidaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    
    const almacenes = this._almacenservice.getAlmacenes();
    const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
    forkJoin([unidadesMedida, almacenes]).subscribe(([unidadesMedida, almacenes]) => {
      this.listaUnidadesMedida = unidadesMedida;
      this.listaAlmacenes = almacenes;        
    });

  }

  public actualizarAlmacen(id: string){ 
    this.router.navigateByUrl( '/almacen/editar/' + id );
  }

  public eliminarAlmacen(id: string){
    this._almacenservice.borrarAlmacen(id).subscribe ( almacen => {
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

  public definirLabel(id: number | string, objeto: string): string {
    let label: string = '';
    if (objeto == 'unidadMedida') {
      let auxMedida = this.listaUnidadesMedida.filter(medida => medida.id == id);
      label = auxMedida[0].Sigla;
    } 
    return label;
  }

}
