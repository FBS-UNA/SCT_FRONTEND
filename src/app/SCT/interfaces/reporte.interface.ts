export interface Reporte{
    ID_REGISTRO_TRAMITE  : string;
    NOMBRE_AREA : string;
    NOMBRE_TRAMITE : string;
    NOMBRE_CLIENTE : string;
    NOMBRE_USUARIO : string;
    FECHA_Y_HORA : string;
    CEDULA : string;
} 

export interface ReporteResponse{
    OK : boolean;
    MSG ?: string;
    REPORTE ?: Reporte[];
}