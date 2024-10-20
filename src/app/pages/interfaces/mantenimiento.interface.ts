export interface MantenimientoInterface {
  id: number; //id automático de json-server
  //IdMantenimiento: number;
  IdSiembra: number;
  IdFrecuenciaRiego: number;
  IdFertilizante: number;
  IdControlPlagas: number;
  FechaMantenimiento: Date;
  FechaCreacion: Date;
}
