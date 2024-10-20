export interface PlagaInterface {
  id: number; //id automático de json-server
  //IdPlaga: number; //Comentamos temporalmente
  IdFrecuencia: number;
  Nombre: string;
  Descripcion: string;
  UrlImagen: string;
  Tratamiento: string;
  FechaCreacion: Date;
}
