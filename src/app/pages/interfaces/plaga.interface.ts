export interface PlagaInterface {
  id: number; //id automático de json-server
//IdPlaga: number; //Comentamos temporalmente
  IdControlPlagas: number;
  IdFrecuencia: number;
  Nombre: string;
  Descripcion: string;
  Imagen: string;
  Tratamiento: string;
  FechaCreacion: Date;
}
