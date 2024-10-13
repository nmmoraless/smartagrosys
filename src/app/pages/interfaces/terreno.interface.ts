export interface TerrenoInterface {
  id: number; //id automático de json-server
  //IdTerreno: number; //Comentamos temporalmente
  Nombre: string;
  IdTipoTerreno: number;
  Area: number;
  IdUnidadMedida: number;
  Altura: number;
  Latitud: string;
  Longitud: string;
  FechaCreacion: Date;
}
