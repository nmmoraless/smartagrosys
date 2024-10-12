import { Component } from '@angular/core';
import { PlanificacionInterface } from '../interfaces/planificacion.interface';
import { PlanificacionService } from '../services/planificacion.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-planificacion-cultivo',
  templateUrl: './planificacion-cultivo.component.html',
  styleUrl: './planificacion-cultivo.component.css'
})
export class PlanificacionCultivoComponent {

  public formPlanificacion: FormGroup = this.fb.group({
    idPlanificacionCultivo: ['', []],
    nombre: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(95), Validators.minLength(1) ]],
    descripcion: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(345), Validators.minLength(1) ], []],
    fechaInicio: ['', [ Validators.required ], []],
    fechaFin: ['', [ Validators.required ], []],
    idEtapa: ['', [ Validators.required ], []],
    idUsuario: ['', [], []],
    fechaCreacion: ['', [], []],
  });
  validacionesService: any;

  constructor( private fb: FormBuilder, private _planificacion: PlanificacionService ) { }

  get planificacionActual(): PlanificacionInterface {
    const planificacion = this.formPlanificacion.value;
    return planificacion;
  }

  public guardar(): void {

    if ( this.formPlanificacion.invalid ) return;

    if (this.planificacionActual.IdPlanificacionCultivo) {
      this._planificacion.actualizarPlanificacion( this.planificacionActual ).subscribe( planificacion => {
        //Actualizar
      })
    } else {
      this._planificacion.agregarPlanificacion( this.planificacionActual ).subscribe( planificacion => {
        console.log(planificacion);        
      })
    }
    console.log({
      formIsValid: this.formPlanificacion.valid,
      value: this.formPlanificacion.value
    });
    
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
