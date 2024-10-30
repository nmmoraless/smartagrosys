import { Component } from '@angular/core';
import { MantenimientoInterface } from '../interfaces/mantenimiento.interface';
import { SiembraInterface } from '../interfaces/siembra.interface';
import { FrecuenciaInterface } from '../interfaces/frecuencia.interface';
import { FertilizanteInterface } from '../interfaces/fertilizante.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidacionesService } from '../services/validaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiembraService } from '../services/siembra.service';
import { FrecuenciaService } from '../services/frecuencia.service';
import { FertilizanteService } from '../services/fertilizante.service';
import { PlagaService } from '../services/plaga.service';
import { forkJoin, switchMap } from 'rxjs';
import { MantenimientoService } from '../services/mantenimiento.service';
import { PlagaInterface } from '../interfaces/plaga.interface';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.css'
})
export class MantenimientoComponent {

  public mantenimiento!: MantenimientoInterface;
  public listaSiembras: SiembraInterface[] = [];
  public listaFrecuencias: FrecuenciaInterface[] = [];
  public listaFertilizantes: FertilizanteInterface[] = [];
  public listaPlagas: PlagaInterface[] = [];
  public esEdicion: boolean = false;
  public colorAlertas: any = {};
  public auxIdSiembra!: string;
  public cargarFormulario: boolean = false;

  public formMantenimiento: FormGroup = this.fb.group({
    //id: [null, []],
    IdSiembra: ['', []],
    IdFrecuenciaRiego: ['', [ Validators.required], []],
    IdFertilizante: ['', [ Validators.required ], []],
    IdControlPlagas: ['', [ Validators.required ], []],
    FechaMantenimiento: ['', [ Validators.required ], []],
    FechaCreacion: ['', [], []],
  });

  constructor( private fb: FormBuilder, private _mantenimiento: MantenimientoService, private _siembra: SiembraService, private _frecuencia: FrecuenciaService, private _fertilizante: FertilizanteService, private _plaga: PlagaService, private _validaciones: ValidacionesService, private activedRoute: ActivatedRoute, private router: Router ) {
   }

  ngOnInit(): void {

    const siembra = history.state.siembra;
    if (siembra) {
      this.auxIdSiembra = siembra.id;
    }

    if ( this.router.url.includes('editar')) {
      this.activedRoute.params.pipe(
        switchMap(({id}) => {
          const siembras = this._siembra.getSiembras();
          const frecuencias = this._frecuencia.getFrecuencias();
          const fertilizantes = this._fertilizante.getFertilizantes();
          const plagas = this._plaga.getPlagas();
          const mantenimiento = this._mantenimiento.getMantenimiento(id);
          return forkJoin([siembras, frecuencias, fertilizantes, plagas, mantenimiento]);
        })
      ).subscribe ( ( [siembras, frecuencias, fertilizantes, plagas, mantenimiento] ) => {
        if (!mantenimiento) {
          this.router.navigateByUrl('/mantenimientos');
        } else {
          this.esEdicion = true;
          this.mantenimiento = mantenimiento[0];
          this.auxIdSiembra = this.mantenimiento.IdSiembra;
          this.listaSiembras = siembras;
          this.listaFrecuencias = frecuencias;
          this.listaFertilizantes = fertilizantes;
          this.listaPlagas = plagas;
          this.cargarFormulario = true;
          this.formMantenimiento.reset(this.mantenimiento);
        }
      });
    } else {
      const siembras = this._siembra.getSiembras();
      const frecuencias = this._frecuencia.getFrecuencias();
      const fertilizantes = this._fertilizante.getFertilizantes();
      const plagas = this._plaga.getPlagas();
      forkJoin([siembras, frecuencias, fertilizantes, plagas]).subscribe(([siembras, frecuencias, fertilizantes, plagas]) => {
        this.listaSiembras = siembras;
        this.listaFrecuencias = frecuencias;
        this.listaFertilizantes = fertilizantes;
        this.listaPlagas = plagas;
        this.cargarFormulario = true;
      });
    }
    this.colorAlertas = this._validaciones.colorAlertas;

  }

  get mantenimientoActual(): MantenimientoInterface {
    const mantenimiento = this.formMantenimiento.value;
    return mantenimiento;
  }

  public guardar(): void {

    if( this.formMantenimiento.invalid ){
      this.formMantenimiento.markAllAsTouched();//Si dan guardar o actualizar y hay campos que no cumplen con las validaciones marca todo para mostrar la alerta
      return;
    } else {
      if (this.mantenimiento) {
        //Actualizar
        let id = this.mantenimiento.id;
        this.mantenimiento = this.mantenimientoActual;
        this.mantenimiento.id = id;
        this._mantenimiento.actualizarMantenimiento( this.mantenimiento ).subscribe( (mantenimiento: MantenimientoInterface) => {
          if (mantenimiento) {
            this.router.navigateByUrl( '/siembra/editar/' + mantenimiento.IdSiembra );
          }
        })
      } else {
        //Crear
        this.mantenimientoActual.IdSiembra = this.auxIdSiembra;
        this._mantenimiento.agregarMantenimiento( this.mantenimientoActual ).subscribe( (mantenimiento: MantenimientoInterface) => {
          if (mantenimiento) {
            this.mantenimiento = mantenimiento;
            this.formMantenimiento.reset(this.mantenimiento);
            this.router.navigateByUrl( '/siembra/editar/' + this.mantenimiento.IdSiembra );
          }
        })
      }
    }

  }

  //Evaluar si hay errores para mostrar alerta de validción
  public campoInValido( campo: string ) : boolean {
    if( this.formMantenimiento.controls[campo].errors && this.formMantenimiento.controls[campo].touched){
      return true;
    } else {
      return false;
    }
  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this._validaciones.obtenerErrorDeCampo(this.formMantenimiento, campo);
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
