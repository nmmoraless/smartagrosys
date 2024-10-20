import { Component, NgZone } from '@angular/core';
import { EstadoInterface } from '../../interfaces/estado.interface';
import { EstadoService } from '../../services/estado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrl: './estados.component.css'
})
export class EstadosComponent {

  public listaEstados: EstadoInterface[] = [];

  constructor( private _estadoService: EstadoService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._estadoService.getEstados().subscribe(estados => {
      this.listaEstados = estados;
    })
  }

  public actualizarEstados(id: number){ 
    this.router.navigateByUrl( '/estado/editar/' + id );
  }

  public eliminarEstado(id: number){
    this._estadoService.borrarEstado(id).subscribe ( estado => {
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
