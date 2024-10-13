import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LatLng, Map, marker, tileLayer } from 'leaflet';
import { TerrenoInterface } from '../interfaces/terreno.interface';
import { TerrenoService } from '../services/terreno.service';
import { ValidacionesService } from '../services/validaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { UnidadMedidaService } from '../services/unidad-medida.service';
import { UnidadMedidaInterface } from '../interfaces/unidad-medida.interface';
import { TipoTerrenoInterface } from '../interfaces/tipo-terreno.interface';
import { TipoTerrenoService } from '../services/tipo-terreno.service';

@Component({
  selector: 'app-terrenos',
  templateUrl: './terrenos.component.html',
  styleUrl: './terrenos.component.css'
})
export class TerrenosComponent implements OnInit {

  public mostrarMapa: boolean = true;
  public terreno!: TerrenoInterface;
  public unidadesMedida: UnidadMedidaInterface[] = [];
  public tiposTerreno: TipoTerrenoInterface[] = [];
  public esEdicion: boolean = false;
  public colorAlertas: any = {};
  public latitud: string = '';
  public longitud: string = '';

  public formTerrenos: FormGroup = this.fb.group({
    //id: [null, []],
    Nombre: ['', [ Validators.required, this.caracteresPermitidos, Validators.maxLength(95), Validators.minLength(1) ]],
    IdTipoTerreno: ['', [ Validators.required], []],
    Area: ['', [ Validators.required ], []],
    IdUnidadMedida: ['', [ Validators.required ], []],
    Altura: ['', [ Validators.required ], []],
    Longitud: ['', [ Validators.required ], []],
    Latitud: ['', [ Validators.required ], []],
    IdUsuario: ['', [], []],
    FechaCreacion: ['', [], []],
  });

  constructor( private fb: FormBuilder, private _terreno: TerrenoService, private _unidadesMedida: UnidadMedidaService, private _tiposTerreno: TipoTerrenoService,  private _validaciones: ValidacionesService, private activedRoute: ActivatedRoute, private router: Router ) {
    this.terreno = {
      id: 0,
      Nombre: '',
      IdTipoTerreno: 0,
      Area: 0,
      IdUnidadMedida: 0,
      Altura: 0,
      Latitud: '',
      Longitud: '',
      FechaCreacion: new Date()
    }
   }

  ngOnInit(): void {

    if ( this.router.url.includes('editar')) {
      this.activedRoute.params.pipe(
        switchMap(({id}) => {
          const terreno = this._terreno.getTerreno( id );
          const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
          const tiposTerreno = this._tiposTerreno.getTiposTerrenos();
          return forkJoin([terreno, unidadesMedida, tiposTerreno]);
        })
      ).subscribe ( ( [terreno, unidadesMedida, tiposTerreno] ) => {
        if (!terreno) {
          this.router.navigateByUrl('/planificaciones');
        } else {
          this.esEdicion = true;
          this.terreno = terreno[0];
          this.unidadesMedida = unidadesMedida;
          this.tiposTerreno = tiposTerreno;
          
          this.formTerrenos.reset(this.terreno);
        }
      });
    } else {
      const unidadesMedida = this._unidadesMedida.getUnidadesMedidas();
      const tiposTerreno = this._tiposTerreno.getTiposTerrenos();
      forkJoin([unidadesMedida, tiposTerreno]).subscribe(([unidadesMedida, tiposTerreno]) => {
        this.unidadesMedida = unidadesMedida;
        this.tiposTerreno = tiposTerreno;         
      });
    }

    this.colorAlertas = this._validaciones.colorAlertas;
    
  }

  get terrenoActual(): TerrenoInterface {
    const terreno = this.formTerrenos.value;
    return terreno;
  }

  public guardar(): void {debugger

    if( this.formTerrenos.invalid ){
      this.formTerrenos.markAllAsTouched();//Si dan guardar o actualizar y hay campos que no cumplen con las validaciones marca todo para mostrar la alerta
      return;
    } else {
      if (this.terreno.id != 0) {
        //Actualizar
        let id = this.terreno.id;
        this.terreno = this.terrenoActual;
        this.terreno.id = id;
        this._terreno.actualizarTerreno( this.terreno ).subscribe( (terreno: TerrenoInterface) => {
          if (terreno) {
            this.router.navigateByUrl( '/terrenos' );
          }
        })
      } else {
        //Crear
        this._terreno.agregarTerreno( this.terrenoActual ).subscribe( (terreno: TerrenoInterface) => {
          if (terreno) {
            this.terreno = terreno;
            this.formTerrenos.reset(this.terreno);
            this.router.navigateByUrl( '/terreno/editar/' + this.terreno.id );
          }
        })
      }
    }



  }

  ngAfterViewInit(): void {
    
    let locationDefault = [4.709870537827504, -74.08241537000409];
    let coordenadas: any;

    setTimeout(() => {

      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      const map = new Map('mapLocation').setView([4.709870537827504, -74.08241537000409], 13);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
  
      //Eventos de localización
  
      map.on('locationfound', (e: {
        accuracy: number, latlng: LatLng
      }) => {
        coordenadas =  e.latlng;
      }); //Capturo mi ubicación
  
      map.on('locationerror', (e: {message: string}) => console.error('error', e.message));
  
      map.locate(); 
      
      setTimeout(() => { //Coloca marcador con la ubicación real o el default

        if(this.esEdicion){ //Cargo mapa con las ubicaciones existentes
          //debugger
          const locationMarker = marker([parseFloat(this.terreno.Latitud), parseFloat(this.terreno.Longitud)] , {
              draggable: true,
            }).addTo(map).bindPopup('Mi ubicación');
            map.fitBounds([
              [locationMarker.getLatLng().lat, locationMarker.getLatLng().lng]
            ], {
              maxZoom: 11.5
            })
    
          locationMarker.on('moveend', (e: {target: any}) => {
            this.terreno.Latitud = e.target._latlng.lat;
            this.terreno.Longitud = e.target._latlng.lng; 
            this.formTerrenos.patchValue( {
              Latitud: this.terreno.Latitud,
              Longitud: this.terreno.Longitud,
            })
          }); //Asingo nueva ubicación para almacenar y guardar     

        } else {

          const locationMarker = marker(coordenadas ? coordenadas : locationDefault, {
            draggable: true,
          }).addTo(map).bindPopup('Mi ubicación');
          map.fitBounds([
            [locationMarker.getLatLng().lat, locationMarker.getLatLng().lng]
          ], {
            maxZoom: 11.5
          })
  
          locationMarker.on('moveend', (e: {target: any}) => {
            this.terreno.Latitud = e.target._latlng.lat;
            this.terreno.Longitud = e.target._latlng.lng; 
            this.formTerrenos.patchValue( {
              Latitud: this.terreno.Latitud,
              Longitud: this.terreno.Longitud,
            })
          }); //Asingo nueva ubicación para almacenar y guardar

        }
        
        
      }, 100);
      
    }, 2500);//Revisar tiempo de espera

  }

  //Evaluar si hay errores para mostrar alerta de validción
  public campoInValido( campo: string ) : boolean {
    if( this.formTerrenos.controls[campo].errors && this.formTerrenos.controls[campo].touched){
      return true;
    } else {
      return false;
    }
  }

  //Obetener errores de validación
  public obtenerErrorDeCampo ( campo: string ): string {
    return this._validaciones.obtenerErrorDeCampo(this.formTerrenos, campo);
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
