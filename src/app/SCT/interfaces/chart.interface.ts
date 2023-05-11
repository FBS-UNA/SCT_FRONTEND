export interface ChartInfo{
    LABEL : string;
    DATA : number;
}


export interface TramitesDonutResponse{
    OK   : boolean;
    MSG ?: string;
    TRAMITES_DONUT ?: ChartInfo[];
}

export interface AreasDonutResponse{
    OK   : boolean;
    MSG ?: string;
    AREAS_DONUT ?: ChartInfo[];
}

export interface TotalRegistroResponse{
    OK   : boolean;
    MSG ?: string;
    CANTIDAD_REGISTROS : number;
}

export interface RegistrosPorMesResponse{
    OK   : boolean;
    MSG ?: string;
    CANTIDAD_REGISTRO_POR_MES_LINE : ChartInfo[];
}

export interface RegistrosPorAnnioResponse{
    OK   : boolean;
    MSG ?: string;
    CANTIDAD_REGISTRO_POR_ANNIO_LINE : ChartInfo[];
}

