import { Component, NgZone } from '@angular/core';
import { SemillaInterface } from '../../interfaces/semilla.interface';
import { SemillaService } from '../../services/semilla.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-semillas',
  templateUrl: './semillas.component.html',
  styleUrl: './semillas.component.css'
})
export class SemillasComponent {

  public listaSemillas: SemillaInterface[] = [];

  constructor( private _semillaservice: SemillaService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this._semillaservice.getSemillas().subscribe(semillas => {
      this.listaSemillas = semillas;
    })
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

}


