export interface AreaResponse{
    OK           : boolean;
    AREAS       ?: Area[];
    NOMBRE_AREA ?: string;
    MSG         ?: string;
}

export interface Area {
    ID_AREA          : number;
    NOMBRE_AREA      : string;
    DESCRIPCION_AREA?: string;
    FECHA           ?: Date;
}