import { Component, NgZone } from '@angular/core';
import { AlmacenInterface } from '../../interfaces/almacen.interface';
import { AlmacenService } from '../../services/almacen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrl: './almacenes.component.css'
})
export class AlmacenesComponent {
  public listaAlmacenes: AlmacenInterface[] = [];

  constructor( private _almacenservice: AlmacenService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._almacenservice.getAlmacenes().subscribe(almacenes => {
      this.listaAlmacenes = almacenes;
    })
  }

  public actualizarAlmacen(id: number){ 
    this.router.navigateByUrl( '/almacen/editar/' + id );
  }

  public eliminarAlmacen(id: number){
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

}
