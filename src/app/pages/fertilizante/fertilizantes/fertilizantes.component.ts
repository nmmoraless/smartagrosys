import { Component, NgZone } from '@angular/core';
import { FertilizanteInterface } from '../../interfaces/fertilizante.interface';
import { FrecuenciaInterface } from '../../interfaces/frecuencia.interface';
import { FertilizanteService } from '../../services/fertilizante.service';
import { FrecuenciaService } from '../../services/frecuencia.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fertilizantes',
  templateUrl: './fertilizantes.component.html',
  styleUrl: './fertilizantes.component.css'
})
export class FertilizantesComponent {

  public listaFertilizantes: FertilizanteInterface[] = [];
  public listaFrecuencias: FrecuenciaInterface[] = [];

  constructor( private _fertilizante: FertilizanteService, private _frecuencia: FrecuenciaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    const frecuencias = this._frecuencia.getFrecuencias();
    const fertilizantes = this._fertilizante.getFertilizantes();
    forkJoin([frecuencias, fertilizantes]).subscribe(([frecuencias, fertilizantes]) => {
      this.listaFrecuencias = frecuencias;
      this.listaFertilizantes = fertilizantes;
    });

  }

  public actualizarFrecuencia(id: number){
    this.router.navigateByUrl( '/fertilizante/editar/' + id );
  }

  public eliminarFrecuencia(id: number){
    this._fertilizante.borrarFertilizante(id).subscribe ( fertilizante => {
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
    if (objeto == 'frecuencias') {
      let auxFrecuencia = this.listaFrecuencias.filter(frecuencia => frecuencia.id == id);
      label = auxFrecuencia[0].Descripcion;
    } 
    return label;
  }

}
