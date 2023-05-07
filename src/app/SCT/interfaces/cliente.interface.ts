export interface ClienteResponse{
    OK      : boolean;
    CLIENTE?: Cliente;
    MSG    ?: string;
}

export interface Cliente{
    CEDULA            : string;
    NOMBRE            : string;
    APELLIDO_1        : string;
    APELLIDO_2        : string;
    TIPO              : string;
    FECHA_NAC        ?: string;
    GENERO           ?: string;
}

export interface ClienteInvitadoResponse{
    OK          :  boolean;
    NOMBRE      ?: string;
    APELLIDO_1  ?: string;
    MSG         ?: string;
}