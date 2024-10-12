export interface TerrenoInterface {
  id: number; //id automático de json-server
  //IdTerreno: number; //Comentamos temporalmente
  IdTipoTerreno: number;
  Area: number;
  UnidadMedida: number;
  Latitud: string;
  Longintud: string;
  FechaCreacion: Date;
}
