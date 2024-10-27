export interface TerrenoInterface {
  id: string; //id automático de json-server
  //IdTerreno: number; //Comentamos temporalmente
  Nombre: string;
  IdTipoTerreno: string;
  Area: number;
  IdUnidadMedida: string;
  Altura: number;
  Latitud: string;
  Longitud: string;
  FechaCreacion: Date;
}
