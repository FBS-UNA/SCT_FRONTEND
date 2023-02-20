export interface TramiteResponse{
    OK             : boolean;
    TRAMITES       ?: Tramite[];
    NOMBRE_TRAMITE ?: string;
    MSG            ?: string
}


export interface Tramite{
    ID_TRAMITE         ?: -1;
    NOMBRE_TRAMITE     ?: '';
    DESCRIPCION_TRAMITE?: '';
    FECHA              ?: Date | string;
    ESTADO             ?: boolean;
}