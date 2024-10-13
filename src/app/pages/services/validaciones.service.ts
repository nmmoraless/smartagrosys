import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }
  
  public colorAlertas = {
    primary: 'alert alert-primary',
    secondary: 'alert alert-secondary',
    success: 'alert alert-success',
    danger: 'text-danger',
    warning: 'alert alert-warning',
    info: 'alert alert-info',
    light: 'alert alert-light',
    dark: 'alert alert-dark'
  };

  public headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'yE)(&kF3&H.XCfYG]US3a7emG:w+V&'
    })
  };

  public obtenerErrorDeCampo ( formurlario: FormGroup, campo: string ): string {
    if( !formurlario.controls[campo]){
      return '';
    } 

    const errores = formurlario.controls[campo].errors || {};

      for ( const key of Object.keys(errores) ) {
        switch ( key ) {
          case 'minlength':
            return `Este campo requiere mínimo ${ errores['minlength'].requiredLength }, carácter(es)`;
          case 'telefonoEsValido':
            return `Lo sentimos, solo se permiten números (0-9)`;
          case 'min':
            return `Este campo requiere como mínimo el valor: ${ errores['min'].min } `;
          case 'max':
            return `Este campo requiere como máximo el valor: ${ errores['min'].min } `;
          case 'required':
            return `El campo es requerido`;
          case 'caracteresPermitidos':
            return `Lo sentimos, solo se permiten letras (a-z), números (0-9), puntos (.) y acentos`;
          case 'caracteresPermitidosSubdominio':
            return `Lo sentimos, solo se permiten letras (a-z) y números (0-9)`;
          case 'requiredTrue':
            return ``;
          case 'emailEsValido':
            return `Dirección de correo inválida`;
          case 'cuentaEsValida':
            return `Debes ingresar únicamente el nombre de tu página`;
          case 'letrasNumeros':
            return `Lo sentimos, solo se permiten letras (a-z) y números (0-9)`;
          case 'maxlength':
            return `Este campo permite máximo ${ errores['maxlength'].requiredLength }, carácter(es)`;
          case 'pattern':
            return ``;
          case 'nullValidator':
            return ``;
          case 'compose':
            return ``;
          case 'composeAsync':
            return ``;
        }
      }

      return '';
  }

}
