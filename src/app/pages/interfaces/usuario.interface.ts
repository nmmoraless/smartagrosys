export interface UsuarioInterface {
  id: string; //id automático de json-server
  //IdUsuario: number; //Comentamos temporalmente
  Nombre: string;
  Apellidos: string;
  Email: string;
  Password: string;
  Telefono: number;
  Rol_IdRol: string;
  Estado_IdEstado: String;
  FechaCreacion: Date;
}
