import { Component, NgZone } from '@angular/core';
import { FrecuenciaInterface } from '../../interfaces/frecuencia.interface';
import { FrecuenciaService } from '../../services/frecuencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frecuencias',
  templateUrl: './frecuencias.component.html',
  styleUrl: './frecuencias.component.css'
})
export class FrecuenciasComponent {

  public listaFrecuencias: FrecuenciaInterface[] = [];

  constructor( private _frecuenciaservice: FrecuenciaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._frecuenciaservice.getFrecuencias().subscribe(frecuencias => {
      this.listaFrecuencias = frecuencias;
    })
  }

  public actualizarFrecuencia(id: number){ 
    this.router.navigateByUrl( '/frecuencia/editar/' + id );
  }

  public eliminarFrecuencia(id: number){
    this._frecuenciaservice.borrarFrecuencia(id).subscribe ( frecuencia => {
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

