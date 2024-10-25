import { Component, NgZone } from '@angular/core';
import { TipoTerrenoInterface } from '../../interfaces/tipo-terreno.interface';
import { TipoTerrenoService } from '../../services/tipo-terreno.service';
import { Router } from '@angular/router';
import { SemillaService } from '../../services/semilla.service';
import { FrecuenciaService } from '../../services/frecuencia.service';
import { forkJoin } from 'rxjs';
import { FrecuenciaInterface } from '../../interfaces/frecuencia.interface';
import { SemillaInterface } from '../../interfaces/semilla.interface';

@Component({
  selector: 'app-tipos-terreno',
  templateUrl: './tipos-terreno.component.html',
  styleUrl: './tipos-terreno.component.css'
})
export class TiposTerrenoComponent {

  public listaTiposTerreno: TipoTerrenoInterface[] = [];
  public listaFrecuencias: FrecuenciaInterface[] = [];
  public listaSemillas: SemillaInterface[] = [];

  constructor( private _tipoterrenoservice: TipoTerrenoService, private _semillaService: SemillaService, private _frecuenciaService: FrecuenciaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    const tiposTerreno = this._tipoterrenoservice.getTiposTerrenos();
    const frecuencias = this._frecuenciaService.getFrecuencias();
    const semillas = this._semillaService.getSemillas();
    forkJoin([tiposTerreno, frecuencias, semillas]).subscribe(([tiposTerreno, frecuencias, semillas]) => {
      this.listaTiposTerreno = tiposTerreno;
      this.listaFrecuencias = frecuencias;
      this.listaSemillas = semillas;        
    });


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

  public definirLabel(id: number | string, objeto: string): string {
    let label: string = '';
    if (objeto == 'semilla') {
      let auxSemilla = this.listaSemillas.filter(semilla => semilla.id == id);
      label = auxSemilla[0].Descripcion;
    } else if (objeto == 'frecuencia') {
      let auxFrecuencia = this.listaFrecuencias.filter(frecuencia => frecuencia.id == id);
      label = auxFrecuencia[0].Descripcion;
    }
    return label;
  }

}




