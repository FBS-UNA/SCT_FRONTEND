export interface AreaResponse {
    OK: boolean;
    AREAS?: Area[];
    AREA?: Area;
    NOMBRE_AREA?: string;
    MSG?: string;
}

export interface Area {
    ID_AREA?: -1;
    NOMBRE_AREA?: '';
    DESCRIPCION_AREA?: '';
    FECHA?: Date | string;
}

export interface AreaRegistro {
    NOMBRE_AREA: string;
    id: number;
}