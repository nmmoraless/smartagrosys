import { Component, NgZone } from '@angular/core';
import { PlagaInterface } from '../../interfaces/plaga.interface';
import { FrecuenciaInterface } from '../../interfaces/frecuencia.interface';
import { PlagaService } from '../../services/plaga.service';
import { FrecuenciaService } from '../../services/frecuencia.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-plagas',
  templateUrl: './plagas.component.html',
  styleUrl: './plagas.component.css'
})
export class PlagasComponent {

  public lsitaPlagas: PlagaInterface[] = [];
  public listaFrecuencias: FrecuenciaInterface[] = [];

  constructor( private _plaga: PlagaService, private _frecuencia: FrecuenciaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    const frecuencias = this._frecuencia.getFrecuencias();
    const plagas = this._plaga.getPlagas();
    forkJoin([frecuencias, plagas]).subscribe(([frecuencias, plagas]) => {
      this.listaFrecuencias = frecuencias;
      this.lsitaPlagas = plagas;
    });

  }

  public actualizarPlaga(id: number){
    this.router.navigateByUrl( '/plaga/editar/' + id );
  }

  public eliminarPlaga(id: number){
    this._plaga.borrarPlaga(id).subscribe ( plaga => {
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
