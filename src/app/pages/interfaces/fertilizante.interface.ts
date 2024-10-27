export interface FertilizanteInterface {
  id: string; //id automático de json-server
  //IdFertilizante: number; //Comentamos temporalmente
  IdFrecuencia: string;
  Nombre: string;
  Descripcion: string;
  ModoUso: string;
  FechaCreacion: Date;
}
