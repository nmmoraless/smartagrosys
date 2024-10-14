export interface PlanificacionInterface {
  id: number; //id automático de json-server
  //IdPlanificacionCultivo: number;//Comentamos temporalmente
  Nombre: string;
  Descripcion: string;
  FechaInicio: Date;
  FechaFin: Date;
  IdEtapa: number;
  IdUsuario: number;
  FechaCreacion: Date;
}
