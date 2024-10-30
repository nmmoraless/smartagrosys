import { Component } from '@angular/core';
import { CosechaInterface } from '../interfaces/cosecha.interface';
import { UnidadMedidaInterface } from '../interfaces/unidad-medida.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CosechaService } from '../services/cosecha.service';
import { UnidadMedidaService } from '../services/unidad-medida.service';
import { ValidacionesService } from '../services/validaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { AlmacenInterface } from '../interfaces/almacen.interface';
import { AlmacenService } from '../services/almacen.service';

@Component({
  selector: 'app-cosecha',
  templateUrl: './cosecha.component.html',
  styleUrl: './cosecha.component.css'
})
export class CosechaComponent {

  public cosecha!: CosechaInterface;
  public unidadesMedida: UnidadMedidaInterface[] = [];
  public almacenes: AlmacenInterface[] = [];
  public esEdicion: boolean = false;
  public colorAlertas: any = {};
  public auxIdSiembra!: string;
  public cargarFormulario: boolean = false;

  public formCosecha: FormGroup = this.fb.group({
    //id: [null, []],
    IdSiembra: ['', [], []],
    FechaCosecha: ['', [ Validators.required], []],
    CantidadCosecha: ['', [ Validators.required ], []],
    CtdBuenEstado: ['', [ Validators.required ], []],
    CtdMalEstado: ['', [ Validators.required ], []],
    IdUnidadMedida: ['', [ Validators.required ], []],
    IdAlmacen: ['', [ Validators.required ], []],
    FechaCreacion: ['', [], []],
  });

  constructor( private fb: FormBuilder, private _cosecha: CosechaService, private _unidadesMedida: UnidadMedidaService, private _almacen: AlmacenService,  private _validaciones: ValidacionesService, private activedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    const siembra = history.state.siembra;
    if (siembra) {
      this.auxIdSiembra = siembra.id;
    }

    if ( this.router.url.includes('editar')) {
      this.activedRoute.params.pipe(
        switchMap(({id}) => {
          const cosecha = this._cosecha.getCosecha( id );
          const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
          const almacenes = this._almacen.getAlmacenes();
          return forkJoin([cosecha, unidadesMedida, almacenes]);
        })
      ).subscribe ( ( [cosecha, unidadesMedida, almacenes] ) => {
        if (!cosecha) {
          this.router.navigateByUrl('/cosechas');
        } else {
          this.esEdicion = true;
          this.cosecha = cosecha[0];
          this.auxIdSiembra = this.cosecha.IdSiembra;
          this.unidadesMedida = unidadesMedida;
          this.almacenes = almacenes;
          this.cargarFormulario = true;
          this.formCosecha.reset(this.cosecha);
        }
      });
    } else {
      const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
      const almacenes = this._almacen.getAlmacenes();
      forkJoin([unidadesMedida, almacenes]).subscribe(([unidadesMedida, almacenes]) => {
        this.unidadesMedida = unidadesMedida;
        this.almacenes = almacenes;   
        this.cargarFormulario = true;     
      });
    }
    this.colorAlertas = this._validaciones.colorAlertas;
    
  }

  get cosechaActual(): CosechaInterface {
    const cosecha = this.formCosecha.value;
    return cosecha;
  }

  public guardar(): void {

    if( this.formCosecha.invalid ){
      this.formCosecha.markAllAsTouched();//Si dan guardar o actualizar y hay campos que no cumplen con las validaciones marca todo para mostrar la alerta
      return;
    } else {
      if (this.cosecha) {
        //Actualizar
        let id = this.cosecha.id;
        this.cosecha = this.cosechaActual;
        this.cosecha.id = id;
        this._cosecha.actualizarCosecha( this.cosecha ).subscribe( (cosecha: CosechaInterface) => {
          if (cosecha) {
            this.router.navigateByUrl( '/siembra/editar/' + cosecha.IdSiembra );
          }
        })
      } else {
        //Crear
        this.cosechaActual.IdSiembra = this.auxIdSiembra;
        this._cosecha.agregarCosecha( this.cosechaActual ).subscribe( (cosecha: CosechaInterface) => {
          if (cosecha) {
            this.cosecha = cosecha;
            this.formCosecha.reset(this.cosecha);
            this.router.navigateByUrl( '/siembra/editar/' + cosecha.IdSiembra );
          }
        })
      }
    }

  }


  //Evaluar si hay errores para mostrar alerta de validción
  public campoInValido( campo: string ) : boolean {
    if( this.formCosecha.controls[campo].errors && this.formCosecha.controls[campo].touched){
      return true;
    } else {
      return false;
    }
  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this._validaciones.obtenerErrorDeCampo(this.formCosecha, campo);
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
