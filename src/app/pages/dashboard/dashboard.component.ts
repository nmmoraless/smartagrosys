import { Component } from '@angular/core';
import { PlanificacionInterface } from '../interfaces/planificacion.interface';
import { SiembraInterface } from '../interfaces/siembra.interface';
import { UnidadMedidaInterface } from '../interfaces/unidad-medida.interface';
import { TerrenoInterface } from '../interfaces/terreno.interface';
import { SiembraService } from '../services/siembra.service';
import { UnidadMedidaService } from '../services/unidad-medida.service';
import { TerrenoService } from '../services/terreno.service';
import { PlanificacionService } from '../services/planificacion.service';
import { forkJoin } from 'rxjs';
import { AlmacenInterface } from '../interfaces/almacen.interface';
import { AlmacenService } from '../services/almacen.service';
import { CosechaInterface } from '../interfaces/cosecha.interface';
import { CosechaService } from '../services/cosecha.service';
import { EstadoInterface } from '../interfaces/estado.interface';
import { EstadoService } from '../services/estado.service';
import { EtapasService } from '../services/etapas.service';
import { EtapaInterface } from '../interfaces/etapa.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public listaPlanificaciones: PlanificacionInterface[] = [];
  public listaSiembras: SiembraInterface[] = [];
  public listaTerrenos: TerrenoInterface[] = [];
  public listaCosechas: CosechaInterface[] = [];
  public listaUnidadesMedida: UnidadMedidaInterface[] = [];
  public listaEtapas: EtapaInterface[] = [];

  //Variables cosechas
  public TotalCosecha: number = 0;
  public CtdBuenEstado: number = 0;
  public CtdMalEstado: number = 0;

  //Variables terrenos
  public alturaPromedio: number = 0;
  public totalMetros: number = 0;
  public totalKm: number = 0;
  public totalHa: number = 0;

  //Variables siembras
  public totalSemillaSiembra: number = 0;
  public totalCosechaEstimada: number = 0;

  //Variables planificaciones
  public totalPreparacionTerreno: number = 0;
  public totalSiembra: number = 0;
  public totalCosecha: number = 0;
  public totalPostCosecha: number = 0;

  constructor( private _siembraService: SiembraService, private _terrenoService: TerrenoService, private _planificacionService: PlanificacionService, private _cosechaService: CosechaService, private _unidadMedidaService: UnidadMedidaService, private _etapaService: EtapasService) { }

  ngOnInit(): void {

    const terrenos = this._terrenoService.getTerrenos();
    const planificaciones = this._planificacionService.getPlanificaciones();
    const siembras = this._siembraService.getSiembras();
    const cosechas = this._cosechaService.getCosechas();
    const unidadesMedida = this._unidadMedidaService.getUnidadesMedidas();
    const etapas = this._etapaService.getEtapas();
    forkJoin([ terrenos, planificaciones, siembras, cosechas, unidadesMedida, etapas]).subscribe(([ terrenos, planificaciones, siembras, cosechas, unidadesMedida, etapas]) => {
      this.listaTerrenos = terrenos;
      this.listaPlanificaciones = planificaciones;
      this.listaSiembras = siembras;
      this.listaCosechas = cosechas;
      this.listaUnidadesMedida = unidadesMedida;
      this.listaEtapas = etapas;
      this.calcularTotalesCosecha();
      this.calcularTotalesTerreno();
      this.calcularTotalesSiembra();
      this.calcularTotalesPlanificaciones();
    });

  }
  
  public calcularTotalesCosecha(){
    const infoCosecha = this.listaCosechas.reduce((acumulador, cosecha) => {
      acumulador.totalCosecha += cosecha.CantidadCosecha;
      acumulador.totalBuenEstado += cosecha.CtdBuenEstado;
      acumulador.totalMalEstado += cosecha.CtdMalEstado;
      return acumulador;
    }, { totalCosecha: 0, totalBuenEstado: 0, totalMalEstado: 0 });
    this.TotalCosecha = infoCosecha.totalCosecha;
    this.CtdBuenEstado = infoCosecha.totalBuenEstado;
    this.CtdMalEstado = infoCosecha.totalMalEstado;
  }

  public calcularTotalesSiembra(){
    const infoSiembra = this.listaSiembras.reduce((acumulador, siembra) => {
      acumulador.totalSemillaSiembra += siembra.CantidadSemillaSiembra;
      acumulador.totalSemillaCosecha += siembra.CantidadCosechaEstimada;
      return acumulador;
    }, { totalSemillaSiembra: 0, totalSemillaCosecha: 0 });
    this.totalSemillaSiembra = infoSiembra.totalSemillaSiembra;
    this.totalCosechaEstimada = infoSiembra.totalSemillaCosecha;
  }

  public calcularTotalesTerreno(){
    let totalMetrosAltura = 0;
    this.listaTerrenos.forEach(terreno => {
      totalMetrosAltura += terreno.Altura;
      let auxUnidadesMedida = this.listaUnidadesMedida.filter(medida => medida.id == terreno.IdUnidadMedida);
      switch (auxUnidadesMedida[0].Sigla.toLowerCase()) {
        case 'km':
          this.totalKm += terreno.Area;         
          break;
        case 'mts':
          this.totalMetros += terreno.Area;
          break;
        case 'ha':
          this.totalHa += terreno.Area;
          break;
      }     
    });
    this.alturaPromedio = totalMetrosAltura / this.listaTerrenos.length;
  }

  public calcularTotalesPlanificaciones(){
    this.listaPlanificaciones.forEach(planificacion => {
      let auxEstado = this.listaEtapas.filter(etapa => etapa.id == planificacion.IdEtapa);
      switch (auxEstado[0].Descripcion.toLowerCase()) {
        case 'preparación del terreno':
          this.totalPreparacionTerreno ++;        
          break;
        case 'siembra':
          this.totalSiembra ++;
          break;
        case 'cosecha':
          this.TotalCosecha ++;
          break;
        case 'postcosecha':
          this.totalPostCosecha ++;
          break;
      }     
    });
  }

}
