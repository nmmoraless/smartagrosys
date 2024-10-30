import { Component } from '@angular/core';
import { FertilizanteInterface } from '../interfaces/fertilizante.interface';
import { FrecuenciaInterface } from '../interfaces/frecuencia.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FertilizanteService } from '../services/fertilizante.service';
import { FrecuenciaService } from '../services/frecuencia.service';
import { ValidacionesService } from '../services/validaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-fertilizante',
  templateUrl: './fertilizante.component.html',
  styleUrl: './fertilizante.component.css'
})
export class FertilizanteComponent {

  public fertilizante!: FertilizanteInterface;
  public listaFrecuencias: FrecuenciaInterface[] = [];
  public esEdicion: boolean = false;
  public colorAlertas: any = {};

  public formFertilizante: FormGroup = this.fb.group({
    //id: [null, []],
    Nombre: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(95), Validators.minLength(1) ]],
    Descripcion: ['', [ Validators.required], []],
    ModoUso: ['', [ Validators.required ], []],
    IdFrecuencia: ['', [ Validators.required ], []],
    FechaCreacion: ['', [], []],
  });

  constructor( private fb: FormBuilder, private _fertilizante: FertilizanteService, private _frecuencia: FrecuenciaService, private _validaciones: ValidacionesService, private activedRoute: ActivatedRoute, private router: Router ) {
    this.fertilizante = {
      id: '',
      Nombre: '',
      Descripcion: '',
      ModoUso: '',
      IdFrecuencia: '',
      FechaCreacion: new Date()
    }
   }

  ngOnInit(): void {

    if ( this.router.url.includes('editar')) {
      this.activedRoute.params.pipe(
        switchMap(({id}) => {
          const fertilizante = this._fertilizante.getFertilizante( id );
          const listaFrecuencias = this._frecuencia.getFrecuencias();
          return forkJoin([fertilizante, listaFrecuencias]);
        })
      ).subscribe ( ( [fertilizante, listaFrecuencias] ) => {
        if (!fertilizante) {
          this.router.navigateByUrl('/fertilizantes');
        } else {
          this.esEdicion = true;
          this.fertilizante = fertilizante[0];
          this.listaFrecuencias = listaFrecuencias;
          
          this.formFertilizante.reset(this.fertilizante);
        }
      });
    } else {
      const listaFrecuencias = this._frecuencia.getFrecuencias();
      forkJoin([listaFrecuencias]).subscribe(([listaFrecuencias]) => {
        this.listaFrecuencias = listaFrecuencias;      
      });
    }
    this.colorAlertas = this._validaciones.colorAlertas;
    
  }

  get fertilizanteActual(): FertilizanteInterface {
    const fertilizante = this.formFertilizante.value;
    return fertilizante;
  }

  public guardar(): void {

    if( this.formFertilizante.invalid ){
      this.formFertilizante.markAllAsTouched();//Si dan guardar o actualizar y hay campos que no cumplen con las validaciones marca todo para mostrar la alerta
      return;
    } else {
      if (this.fertilizante.id != '') {
        //Actualizar
        let id = this.fertilizante.id;
        this.fertilizante = this.fertilizanteActual;
        this.fertilizante.id = id;
        this._fertilizante.actualizarFertilizante( this.fertilizante ).subscribe( (fertilizante: FertilizanteInterface) => {
          if (fertilizante) {
            this.router.navigateByUrl( '/fertilizantes' );
          }
        })
      } else {
        //Crear
        this._fertilizante.agregarFertilizante( this.fertilizanteActual ).subscribe( (fertilizante: FertilizanteInterface) => {
          if (fertilizante) {
            this.fertilizante = fertilizante;
            this.formFertilizante.reset(this.fertilizante);
            this.router.navigateByUrl( '/fertilizante/editar/' + this.fertilizante.id );
          }
        })
      }
    }



  }

  //Evaluar si hay errores para mostrar alerta de validción
  public campoInValido( campo: string ) : boolean {
    if( this.formFertilizante.controls[campo].errors && this.formFertilizante.controls[campo].touched){
      return true;
    } else {
      return false;
    }
  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this._validaciones.obtenerErrorDeCampo(this.formFertilizante, campo);
  }

  public emailEsValido(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.match(/^[a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
      return null;
    } else {
      return { emailEsValido: true };
    }
  }

  public telefonoEsValido(control: AbstractControl): ValidationErrors | null {
    const telefono = /^[0-9]*$/;
    if (control.value && !telefono.test(control.value)) {
      return { telefonoEsValido: true };
    } else {
      return null;
    }
  }

  public caracteresPermitidos(control: AbstractControl): ValidationErrors | null {
    const permitido = /^[a-zA-Z0-9\s-á#é-í.ó:ú;ü,ñ(Á)É/ÍÓÚÜÑ~]+$/;
    if (control.value && !permitido.test(control.value)) {
      return { caracteresPermitidos: true };
    } else {
      return null;
    }
  }

}
