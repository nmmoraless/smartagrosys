export interface MantenimientoInterface {
  id: number; //id automático de json-server
  //IdSemilla: number; //Comentamos temporalmente
  IdMantenimiento: number;
  IdSiembra: number;
  IdFrecuenciaRiego: number;
  IdFertilizante: number;
  IdControlPlagas: number;
  FechaMantenimiento: Date;
  FechaCreacion: Date;
}
