export interface MantenimientoInterface {
  id: string; //id automático de json-server
  //IdMantenimiento: number;
  IdSiembra: string;
  IdFrecuenciaRiego: string;
  IdFertilizante: string;
  IdControlPlagas: string;
  FechaMantenimiento: Date;
  FechaCreacion: Date;
}
