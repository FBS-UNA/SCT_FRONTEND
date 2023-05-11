export interface TramiteDonut{
    NOMBRE_TRAMITE : string;
    CANTIDAD : number;
}
export interface AreaDonut{
    NOMBRE_AREA : string;
    CANTIDAD : number;
}
export interface RegistrosPorMes{
    MES : string;
    CANTIDAD : number;
}
export interface RegistrosPorAnnio{
    MES : string;
    CANTIDAD : number;
}


export interface TramitesDonutResponse{
    OK   : boolean;
    MSG ?: string;
    TRAMITES_DONUT ?: TramiteDonut[];
}

export interface AreasDonutResponse{
    OK   : boolean;
    MSG ?: string;
    AREAS_DONUT ?: AreaDonut[];
}

export interface TotalRegistroResponse{
    OK   : boolean;
    MSG ?: string;
    CANTIDAD_REGISTROS : number;
}

export interface RegistrosPorMesResponse{
    OK   : boolean;
    MSG ?: string;
    CANTIDAD_REGISTRO_POR_MES_LINE : RegistrosPorMes[];
}

export interface RegistrosPorAnnioResponse{
    OK   : boolean;
    MSG ?: string;
    CANTIDAD_REGISTRO_POR_ANNIO_LINE : RegistrosPorAnnio[];
}

