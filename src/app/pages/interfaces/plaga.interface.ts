export interface PlagaInterface {
  id: string; //id automático de json-server
  //IdPlaga: number; //Comentamos temporalmente
  IdFrecuencia: string;
  Nombre: string;
  Descripcion: string;
  UrlImagen: string;
  Tratamiento: string;
  FechaCreacion: Date;
}
