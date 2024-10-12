export interface CosechaInterface {
    id: number; //id automático de json-server
//IdCosecha: number; //Comentamos temporalmente
    IdCosecha: number;
    IdSiembra: string;
    FechaCosecha: Date;
    CantidadCosecha: number;
    CantBuenEstado: number;
    CantMalEstado: number;
    IdUnidadMedida: number;
    IdAlmacen: string;
    FechaCreacion: Date;
}
