export interface CosechaInterface {
  id: string; //id automático de json-server
  //IdCosecha: number; //Comentamos temporalmente
  IdSiembra: string;
  FechaCosecha: Date;
  CantidadCosecha: number;
  CtdBuenEstado: number;
  CtdMalEstado: number;
  IdUnidadMedida: string;
  IdAlmacen: string;
  FechaCreacion: Date;
}
