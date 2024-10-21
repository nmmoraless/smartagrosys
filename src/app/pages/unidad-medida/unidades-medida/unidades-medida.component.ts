import { Component, NgZone } from '@angular/core';
import { UnidadMedidaInterface } from '../../interfaces/unidad-medida.interface';
import { UnidadMedidaService } from '../../services/unidad-medida.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidades-medida',
  templateUrl: './unidades-medida.component.html',
  styleUrl: './unidades-medida.component.css'
})
export class UnidadesMedidaComponent {

  public listaUnidadesMedida: UnidadMedidaInterface[] = [];

  constructor(
    private _UnidadMeidaService: UnidadMedidaService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this._UnidadMeidaService.getUnidadesMedidas().subscribe((medides) => {
      this.listaUnidadesMedida = medides;
    });
  }

  public actualizarUnidadesMedida(id: number) {
    this.router.navigateByUrl('/unidad-medida/editar/' + id);
  }

  public eliminarUnidadesMedida(id: number) {
    this._UnidadMeidaService.borrarUnidadesMedida(id).subscribe((medida) => {
      //Recarga de componente actual
      setTimeout(() => {
        this.ngZone.run(() => {
          const currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        });
      }, 500);
    });
  }

}
