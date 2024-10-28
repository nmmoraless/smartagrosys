import { Component } from '@angular/core';
import { UsuarioInterface } from '../../pages/interfaces/usuario.interface';
import { UsuarioService } from '../../pages/services/usuario.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidacionesService } from '../../pages/services/validaciones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public listaUsarios: UsuarioInterface[] = [];
  public colorAlertas: any = {};
  public loginExitoso: boolean = true;

  public formUsuario: FormGroup = this.fb.group({
    //id: [null, []],
    Email: ['', [ Validators.required, Validators.maxLength(48), this.emailEsValido], []],
    Password: ['', [ Validators.required, Validators.minLength(6) ], []],
  });

  constructor( private fb: FormBuilder, private _usuario: UsuarioService, private _validaciones: ValidacionesService, private activedRoute: ActivatedRoute, private router: Router ) {

  }

  ngOnInit(): void {

    this._usuario.getUsuarios().subscribe(usuarios => {
      this.listaUsarios = usuarios;
    });

    this.colorAlertas = this._validaciones.colorAlertas;

  }

  get usuarioActual(): UsuarioInterface {
    const usuario = this.formUsuario.value;
    return usuario;
  }

  //Evaluar si hay errores para mostrar alerta de validción
  public campoInValido( campo: string ) : boolean {
    if( this.formUsuario.controls[campo].errors && this.formUsuario.controls[campo].touched){
      return true;
    } else {
      return false;
    }
  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this._validaciones.obtenerErrorDeCampo(this.formUsuario, campo);
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

  public login(){
    if( this.formUsuario.invalid ){
      this.formUsuario.markAllAsTouched();//Si dan guardar o actualizar y hay campos que no cumplen con las validaciones marca todo para mostrar la alerta
      return;
    } else {
      let auxUsuario = this.listaUsarios.filter(usuario => usuario.Email == this.usuarioActual.Email);
      if (this.usuarioActual.Password == auxUsuario[0].Password) {
        this.loginExitoso = true;
        this.router.navigateByUrl( '/dashboard' );
      } else {
        this.loginExitoso = false;
      }
    }

  }

}
