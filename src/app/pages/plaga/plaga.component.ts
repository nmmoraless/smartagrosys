import { Component } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { PlagaInterface } from '../interfaces/plaga.interface';
import { FrecuenciaInterface } from '../interfaces/frecuencia.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PlagaService } from '../services/plaga.service';
import { FrecuenciaService } from '../services/frecuencia.service';
import { ValidacionesService } from '../services/validaciones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plaga',
  templateUrl: './plaga.component.html',
  styleUrl: './plaga.component.css'
})
export class PlagaComponent {

  public plaga!: PlagaInterface;
  public listaFrecuencias: FrecuenciaInterface[] = [];
  public esEdicion: boolean = false;
  public colorAlertas: any = {};

  public formPlaga: FormGroup = this.fb.group({
    //id: [null, []],
    Nombre: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(95), Validators.minLength(1) ]],
    Descripcion: ['', [ Validators.required], []],
    Tratamiento: ['', [ Validators.required ], []],
    UrlImagen: ['', [ Validators.required ], []],
    IdFrecuencia: ['', [ Validators.required ], []],
    FechaCreacion: ['', [], []],
  });

  constructor( private fb: FormBuilder, private _plaga: PlagaService, private _frecuencia: FrecuenciaService, private _validaciones: ValidacionesService, private activedRoute: ActivatedRoute, private router: Router ) {
    this.plaga = {
      id: 0,
      Nombre: '',
      Descripcion: '',
      Tratamiento: '',
      UrlImagen: '',
      IdFrecuencia: 0,
      FechaCreacion: new Date()
    }
   }

  ngOnInit(): void {

    if ( this.router.url.includes('editar')) {
      this.activedRoute.params.pipe(
        switchMap(({id}) => {
          const plaga = this._plaga.getPlaga( id );
          const listaFrecuencias = this._frecuencia.getFrecuencias();
          return forkJoin([plaga, listaFrecuencias]);
        })
      ).subscribe ( ( [plaga, listaFrecuencias] ) => {
        if (!plaga) {
          this.router.navigateByUrl('/plagas');
        } else {
          this.esEdicion = true;
          this.plaga = plaga[0];
          this.listaFrecuencias = listaFrecuencias;
          
          this.formPlaga.reset(this.plaga);
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

  get plagaActual(): PlagaInterface {
    const plaga = this.formPlaga.value;
    return plaga;
  }

  public guardar(): void {debugger

    if( this.formPlaga.invalid ){
      this.formPlaga.markAllAsTouched();//Si dan guardar o actualizar y hay campos que no cumplen con las validaciones marca todo para mostrar la alerta
      return;
    } else {
      if (this.plaga.id != 0) {
        //Actualizar
        let id = this.plaga.id;
        this.plaga = this.plagaActual;
        this.plaga.id = id;
        this._plaga.actualizarPlaga( this.plaga ).subscribe( (plaga: PlagaInterface) => {
          if (plaga) {
            this.router.navigateByUrl( '/plagas' );
          }
        })
      } else {
        //Crear
        this._plaga.agregarPlaga( this.plagaActual ).subscribe( (plaga: PlagaInterface) => {
          if (plaga) {
            this.plaga = plaga;
            this.formPlaga.reset(this.plaga);
            this.router.navigateByUrl( '/plaga/editar/' + this.plaga.id );
          }
        })
      }
    }



  }

  //Evaluar si hay errores para mostrar alerta de validción
  public campoInValido( campo: string ) : boolean {
    if( this.formPlaga.controls[campo].errors && this.formPlaga.controls[campo].touched){
      return true;
    } else {
      return false;
    }
  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this._validaciones.obtenerErrorDeCampo(this.formPlaga, campo);
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

  public validaImagen(){
    if (this.esEdicion) {
      return this.plaga.UrlImagen ? this.plaga.UrlImagen : '../../../assets/img/image_plaga.png';
    } else {
      return this.plagaActual.UrlImagen ? this.plagaActual.UrlImagen : '../../../assets/img/image_plaga.png';
    }
  }

}
