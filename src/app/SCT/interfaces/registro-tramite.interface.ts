export interface RegistroTramiteModel{
    CEDULA_CLIENTE      : string;
    NOMBRE_TRAMITE     ?: string;
    ID_TRAMITE          : string;
    DESCRIPCION         : string;
    FECHA               : Date | string;
    HORA                : Date | string;
    CEDULA_USUARIO      : string;
    ID_AREA         : number;
}