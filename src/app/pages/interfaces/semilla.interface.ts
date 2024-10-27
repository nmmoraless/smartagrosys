export interface SemillaInterface {
  id: string; //id automático de json-server
  //IdSemilla: number; //Comentamos temporalmente
  IdSemilla: string;
  Descripcion: string;
  Especificaciones: string;
  RendimientoSemilla: number;
  RendimientoCosecha: number;
  IdUnidadMedida: number;
  FechaCreacion: Date;
}
