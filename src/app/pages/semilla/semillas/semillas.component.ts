import { Component, NgZone } from '@angular/core';
import { SemillaInterface } from '../../interfaces/semilla.interface';
import { SemillaService } from '../../services/semilla.service';
import { Router } from '@angular/router';
import { UnidadMedidaInterface } from '../../interfaces/unidad-medida.interface';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-semillas',
  templateUrl: './semillas.component.html',
  styleUrl: './semillas.component.css'
})
export class SemillasComponent {

  public listaSemillas: SemillaInterface[] = [];
  public listaUnidadesMedida: UnidadMedidaInterface[] = [];

  constructor( private _semillaservice: SemillaService, private _unidadesMedida: UnidadMedidaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    const semillas = this._semillaservice.getSemillas();
    const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
    forkJoin([unidadesMedida, semillas]).subscribe(([unidadesMedida, semillas]) => {
      this.listaUnidadesMedida = unidadesMedida;
      this.listaSemillas = semillas;        
    });

  }

  public actualizarSemilla(id: number){ 
    this.router.navigateByUrl( '/semilla/editar/' + id );
  }

  public eliminarSemilla(id: number){
    this._semillaservice.borrarSemilla(id).subscribe ( semilla => {
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


