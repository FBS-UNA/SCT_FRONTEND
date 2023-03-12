
export interface RegistroTramiteModel{
    ID_TRAMITE      :   string;
    CEDULA_CLIENTE  :   string;
    CEDULA_USUARIO ?:   string;
    DESCRIPCION    ?:   string;
    REGISTRO_INICIO :   RegistroHoraInicio;
    FECHA_FINAL     :   Date  | string;
    HORA_FINAL      :   Date  | string;
}

export interface RegistroHoraInicio{
    FECHA_INICIO    :   Date  | string;
    HORA_INICIO     :   Date  | string;
}
