export interface UsuarioInterface {
  getUsuario(): unknown;
  id: number; //id automático de json-server
  //IdUsuario: number; //Comentamos temporalmente
  IdUsuario: number;
  Nombre: string;
  Apellidos: string;
  Email: string;
  Password: string;
  Telefono: number;
  IdRol: string;
  IdEstado: String;
  FechaCreacion: Date;
}
