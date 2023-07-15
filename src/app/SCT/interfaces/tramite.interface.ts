export interface TramiteResponse{
    OK             : boolean;
    TRAMITES       ?: Tramite[];
    NOMBRE_TRAMITE ?: string;
    MSG            ?: string
}

export interface TramitesAsociados{
    OK                       : boolean;
    LISTA_TRAMITES_ASOCIADOS?: Tramite[];
    LISTA_TRAMITES_NO_ASOCIADOS?: Tramite[];
    MSG                     ?: string

}


export interface Tramite{
    ID_TRAMITE         ?: -1 | number;
    NOMBRE_TRAMITE     ?: '';
    DESCRIPCION_TRAMITE?: '';
    FECHA              ?: Date | string;
    ESTADO             ?: boolean;
}

export interface TramiteRegistro{
    nombre: string;
}