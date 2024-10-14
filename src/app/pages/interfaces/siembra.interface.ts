export interface SiembraInterface {
  id: number; //id automático de json-server
  //IdSiembra: number; //Comentamos temporalmente
  IdPlanificacionCultivo: string;
  IdTerreno: number;
  CantidadSemillaSiembra: number;
  CantidadCosechaEstimada: number;
  IdUnidadMedida: number;
  FechaSiembra: Date;
  FechaCreacion: Date;
}
