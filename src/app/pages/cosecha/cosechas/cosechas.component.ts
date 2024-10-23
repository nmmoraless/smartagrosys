import { Component, NgZone } from '@angular/core';
import { CosechaInterface } from '../../interfaces/cosecha.interface';
import { CosechaService } from '../../services/cosecha.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cosechas',
  templateUrl: './cosechas.component.html',
  styleUrl: './cosechas.component.css'
})
export class CosechasComponent {

  public listaCosechas: CosechaInterface[] = [];

  constructor( private _cosechaservice: CosechaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._cosechaservice.getCosechas().subscribe(cosechas => {
      this.listaCosechas = cosechas;
    })
  }

  public actualizarCosecha(id: number){ 
    this.router.navigateByUrl( '/cosecha/editar/' + id );
  }

  public eliminarCosecha(id: number){
    this._cosechaservice.borrarCosecha(id).subscribe ( cosecha => {
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



