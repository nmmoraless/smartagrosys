export interface SiembraInterface {
  id: string; //id automático de json-server
  //IdSiembra: number; //Comentamos temporalmente
  IdPlanificacionCultivo: string;
  IdTerreno: string;
  CantidadSemillaSiembra: number;
  CantidadCosechaEstimada: number;
  IdUnidadMedida: string;
  FechaSiembra: Date;
  FechaCreacion: Date;
}
