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

  //revisar y adecuar a smart agro
  public formPlanificacion: FormGroup = this.fb.group({
    titulo: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(95), Validators.minLength(1) ]],
    descripcion: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(345), Validators.minLength(1) ], []],
    email: ['', [ Validators.required, Validators.maxLength(48), this.emailEsValido ], []],
    direccion: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(55), Validators.minLength(1) ], []],
    departamentosId: ['', [ Validators.required, Validators.min(1) ], []],
    municipiosId: ['', [ Validators.required, Validators.min(1) ], []],
    telefono: ['', [ Validators.required, this.telefonoEsValido, Validators.maxLength(10), Validators.minLength(10) ], []],
    whatsapp: ['', [ Validators.required, this.telefonoEsValido, Validators.maxLength(10), Validators.minLength(10) ], []],
    planesId: ['', [ Validators.required, Validators.required, Validators.min(1) ], []],
  });
  validacionesService: any;

  constructor( private fb: FormBuilder ) { }

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
