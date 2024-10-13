import { Component, OnInit } from '@angular/core';
import { PlanificacionInterface } from '../interfaces/planificacion.interface';
import { PlanificacionService } from '../services/planificacion.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-planificacion-cultivo',
  templateUrl: './planificacion-cultivo.component.html',
  styleUrl: './planificacion-cultivo.component.css'
})
export class PlanificacionCultivoComponent implements OnInit {

  public planificacionCultivo!: PlanificacionInterface;

  public formPlanificacion: FormGroup = this.fb.group({
    id: ['', []],
    Nombre: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(95), Validators.minLength(1) ]],
    Descripcion: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(345), Validators.minLength(1) ], []],
    FechaInicio: ['', [ Validators.required ], []],
    FechaFin: ['', [ Validators.required ], []],
    IdEtapa: ['', [ Validators.required ], []],
    IdUsuario: ['', [], []],
    FechaCreacion: ['', [], []],
  });
  validacionesService: any;

  constructor( private fb: FormBuilder, private _planificacion: PlanificacionService, private activedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    if ( this.router.url.includes('editar')) {
      this.activedRoute.params.pipe(
        switchMap(({id}) => this._planificacion.getPlanificacion( id ))
      ).subscribe ( (planificacion: PlanificacionInterface[]) => {
        debugger
        this.planificacionCultivo = planificacion[0];
        this.formPlanificacion.setValue(this.planificacionCultivo);
      })
    }

  }

  get planificacionActual(): PlanificacionInterface {
    const planificacion = this.formPlanificacion.value;
    return planificacion;
  }

  public guardar(): void {

    if ( this.formPlanificacion.invalid ) return;

    if (this.planificacionActual.id) {
      this._planificacion.actualizarPlanificacion( this.planificacionActual ).subscribe( planificacion => {
        //Actualizar
      })
    } else {
      this._planificacion.agregarPlanificacion( this.planificacionActual ).subscribe( planificacion => {
        console.log(planificacion);
      })
    }

  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this.validacionesService.obtenerErrorDeCampo(this.formPlanificacion, campo);
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
