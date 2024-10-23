import { Component, NgZone } from '@angular/core';
import { EtapaInterface } from '../../interfaces/etapa.interface';
import { EtapasService } from '../../services/etapas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrl: './etapas.component.css'
})
export class EtapasComponent {
public listaEtapas: EtapaInterface[] = [];

  constructor( private _etapasservice: EtapasService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._etapasservice.getEtapas().subscribe(etapas => {
      this.listaEtapas = etapas;
    })
  }

  public actualizarEtapa(id: number){ 
    this.router.navigateByUrl( '/etapa/editar/' + id );
  }

  public eliminarEtapa(id: number){
    this._etapasservice.borrarEtapa(id).subscribe ( etapa => {
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
