export interface PlanificacionInterface {
  id: string; //id automático de json-server
  //IdPlanificacionCultivo: number;//Comentamos temporalmente
  Nombre: string;
  Descripcion: string;
  FechaInicio: Date;
  FechaFin: Date;
  IdEtapa: string;
  IdUsuario: string;
  FechaCreacion: Date;
}
