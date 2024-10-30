import { Component, OnInit } from '@angular/core';
import { PlanificacionInterface } from '../interfaces/planificacion.interface';
import { PlanificacionService } from '../services/planificacion.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EtapasService } from '../services/etapas.service';
import { EtapaInterface } from '../interfaces/etapa.interface';
import { ValidacionesService } from '../services/validaciones.service';

@Component({
  selector: 'app-planificacion-cultivo',
  templateUrl: './planificacion-cultivo.component.html',
  styleUrl: './planificacion-cultivo.component.css'
})
export class PlanificacionCultivoComponent implements OnInit {

  public planificacionCultivo!: PlanificacionInterface;
  public etapasCultivo: EtapaInterface[] = [];
  public esEdicion: boolean = false;
  public colorAlertas: any = {};

  public formPlanificacion: FormGroup = this.fb.group({
    //id: [null, []],
    Nombre: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(95), Validators.minLength(1) ]],
    Descripcion: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(345), Validators.minLength(1) ], []],
    FechaInicio: ['', [ Validators.required ], []],
    FechaFin: ['', [], []],
    IdEtapa: ['', [ Validators.required ], []],
    IdUsuario: ['', [], []],
    FechaCreacion: ['', [], []],
  });

  constructor( private fb: FormBuilder, private _planificacion: PlanificacionService, private _etapas: EtapasService, private _validaciones: ValidacionesService, private activedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    this._etapas.getEtapas().subscribe((etapas: EtapaInterface[]) => {
      this.etapasCultivo = etapas;
    })

    if ( this.router.url.includes('editar')) {
      this.activedRoute.params.pipe(
        switchMap(({id}) => this._planificacion.getPlanificacion( id ))
      ).subscribe ( (planificacion: PlanificacionInterface[]) => {
        if (!planificacion) {
          this.router.navigateByUrl('/planificaciones');
        } else {
          this.esEdicion = true;
          this.planificacionCultivo = planificacion[0];
          this.formPlanificacion.reset(this.planificacionCultivo);
        }
      })
    }

    this.colorAlertas = this._validaciones.colorAlertas;

  }

  get planificacionActual(): PlanificacionInterface {
    const planificacion = this.formPlanificacion.value;
    return planificacion;
  }

  public guardar(): void {

    if( this.formPlanificacion.invalid ){
      this.formPlanificacion.markAllAsTouched();//Si dan guardar o actualizar y hay campos que no cumplen con las validaciones marca todo para mostrar la alerta
      return;
    } else {
      if (this.planificacionCultivo) {
        //Actualizar
        let id = this.planificacionCultivo.id;
        this.planificacionCultivo = this.planificacionActual;
        this.planificacionCultivo.id = id;
        this._planificacion.actualizarPlanificacion( this.planificacionCultivo ).subscribe( (planificacion: PlanificacionInterface) => {
          if (planificacion) {
            this.router.navigateByUrl( '/planificaciones' );
          }
        })
      } else {
        //Crear
        this._planificacion.agregarPlanificacion( this.planificacionActual ).subscribe( (planificacion: PlanificacionInterface) => {
          if (planificacion) {
            this.planificacionCultivo = planificacion;
            this.formPlanificacion.reset(this.planificacionCultivo);
            this.router.navigateByUrl( '/planificacion/editar/' + this.planificacionCultivo.id );
          }
        })
      }
    }



  }

  //Evaluar si hay errores para mostrar alerta de validción
  public campoInValido( campo: string ) : boolean {
    if( this.formPlanificacion.controls[campo].errors && this.formPlanificacion.controls[campo].touched){
      return true;
    } else {
      return false;
    }
  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this._validaciones.obtenerErrorDeCampo(this.formPlanificacion, campo);
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
