export interface CosechaInterface {
  id: number; //id automático de json-server
  //IdCosecha: number; //Comentamos temporalmente
  IdSiembra: string;
  FechaCosecha: Date;
  CantidadCosecha: number;
  CtdBuenEstado: number;
  CtdMalEstado: number;
  IdUnidadMedida: number;
  IdAlmacen: string;
  FechaCreacion: Date;
}
