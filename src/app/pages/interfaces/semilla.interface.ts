export interface SemillaInterface {
    id: number; //id automático de json-server
//IdSemilla: number; //Comentamos temporalmente
    IdSemilla: number;
    Descripcion: string;
    Especificaciones: string;
    RendimientoSemilla: number;
    RendimientoCosecha: number;
    IdUnidadMedida: number;
    FechaCreacion: Date;
}
