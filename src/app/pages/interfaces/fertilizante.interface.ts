export interface FertilizanteInterface {
  id: number; //id automático de json-server
  //IdFertilizante: number; //Comentamos temporalmente
  IdFertilizante: number;
  IdFrecuencia: number;
  Nombre: string;
  Descripcion: string;
  ModoUso: string;
  FechaCreacion: Date;
}
