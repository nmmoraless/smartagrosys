export interface PlanificacionInterface {
    id: number; //id automático de json-server
//IdPlanificacion: number; //Comentamos temporalmente
    IdPlanificacionCultivo: number;
    Nombre: string;
    Descripcion: string;
    FechaInicio: Date;
    FechaFin: Date;
    IdEtapa: number;
    IdUsuario: number;
    FechaCreacion: Date;
}
