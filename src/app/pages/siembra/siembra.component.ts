import { Component } from '@angular/core';
import { SiembraInterface } from '../interfaces/siembra.interface';
import { UnidadMedidaInterface } from '../interfaces/unidad-medida.interface';
import { TerrenoInterface } from '../interfaces/terreno.interface';
import { SemillaInterface } from '../interfaces/semilla.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SiembraService } from '../services/siembra.service';
import { UnidadMedidaService } from '../services/unidad-medida.service';
import { TerrenoService } from '../services/terreno.service';
import { SemillaService } from '../services/semilla.service';
import { ValidacionesService } from '../services/validaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { PlanificacionInterface } from '../interfaces/planificacion.interface';
import { PlanificacionService } from '../services/planificacion.service';

@Component({
  selector: 'app-siembra',
  templateUrl: './siembra.component.html',
  styleUrl: './siembra.component.css'
})
export class SiembraComponent {

  public siembra!: SiembraInterface;
  public listaUnidesMedida: UnidadMedidaInterface[]= [];
  public listaPlanificaciones: PlanificacionInterface[] = [];
  public listaTerrenos: TerrenoInterface[] = [];
  public listaSemillas: SemillaInterface[] = [];
  public esEdicion: boolean = false;
  public colorAlertas: any = {};

  public formSiembra: FormGroup = this.fb.group({
    //id: [null, []],
    IdPlanificacionCultivo: ['', [ Validators.required]],
    IdTerreno: ['', [ Validators.required]],
    IdSemilla: ['', [ Validators.required]],
    CantidadSemillaSiembra: ['', [ Validators.required]],
    CantidadCosechaEstimada: ['', [ Validators.required]],
    IdUnidadMedida: ['', [ Validators.required]],
    FechaSiembra: ['', [ Validators.required]],
    IdUsuario: ['', [], []],
    FechaCreacion: ['', [], []],
  });

  constructor( private fb: FormBuilder, private _planificacion: PlanificacionService, private _siembra: SiembraService, private _unidadesMedida: UnidadMedidaService, private _terreno: TerrenoService, private _semilla: SemillaService, private _validaciones: ValidacionesService, private activedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    if ( this.router.url.includes('editar')) {
      this.activedRoute.params.pipe(
        switchMap(({id}) => {
          const planificacion = this._planificacion.getPlanificaciones() ;
          const terrenos = this._terreno.getTerrenos( );
          const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
          const semillas = this._semilla.getSemillas();
          const siembra = this._siembra.getSiembra( id );
          return forkJoin([planificacion, terrenos, unidadesMedida, semillas, siembra]);
        })
      ).subscribe ( ( [planificacion, terrenos, unidadesMedida, semillas, siembra] ) => {debugger
        if (!siembra) {
          this.router.navigateByUrl('/siembras');
        } else {
          this.esEdicion = true;
          this.listaPlanificaciones = planificacion;
          this.listaTerrenos = terrenos;
          this.listaUnidesMedida = unidadesMedida;
          this.listaSemillas = semillas;
          this.siembra = siembra[0];

          this.formSiembra.reset(this.siembra);
        }
      });
    } else {
      const planificacion = this._planificacion.getPlanificaciones() ;
      const terrenos = this._terreno.getTerrenos( );
      const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
      const semillas = this._semilla.getSemillas();
      forkJoin([planificacion, terrenos, unidadesMedida, semillas]).subscribe(([planificacion, terrenos, unidadesMedida, semillas]) => {
        this.listaPlanificaciones = planificacion;
        this.listaTerrenos = terrenos;
        this.listaUnidesMedida = unidadesMedida;
        this.listaSemillas = semillas;
      });
    }
    this.colorAlertas = this._validaciones.colorAlertas;
  }

  get siembraActual(): SiembraInterface {
    const Siembra = this.formSiembra.value;
    return Siembra;
  }

  public guardar(): void {

    if( this.formSiembra.invalid ){
      this.formSiembra.markAllAsTouched();//Si dan guardar o actualizar y hay campos que no cumplen con las validaciones marca todo para mostrar la alerta
      return;
    } else {
      if (this.siembra) {
        //Actualizar
        let id = this.siembra.id;
        this.siembra = this.siembraActual;
        this.siembra.id = id;
        this._siembra.actualizarSiembra( this.siembra ).subscribe( (siembra: SiembraInterface) => {debugger
          if (siembra) {
            this.router.navigateByUrl( '/siembras' );
          }
        })
      } else {
        //Crear
        this._siembra.agregarSiembra( this.siembraActual ).subscribe( (siembra: SiembraInterface) => {
          if (siembra) {
            this.siembra = siembra;
            this.formSiembra.reset(this.siembra);
            this.router.navigateByUrl( '/siembra/editar/' + this.siembra.id );
          }
        })
      }
    }



  }

  //Evaluar si hay errores para mostrar alerta de validción
  public campoInValido( campo: string ) : boolean {
    if( this.formSiembra.controls[campo].errors && this.formSiembra.controls[campo].touched){
      return true;
    } else {
      return false;
    }
  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this._validaciones.obtenerErrorDeCampo(this.formSiembra, campo);
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

  public crearMantenimiento(){debugger
    let siembra = {id: this.siembra.id}
    this.router.navigate(['/mantenimiento/agregar'], { state: { siembra } });
  }

  public crearCosecha(){debugger
    let siembra = {id: this.siembra.id}
    this.router.navigate(['/cosecha/agregar'], { state: { siembra } });
  }

}
