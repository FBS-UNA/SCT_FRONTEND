
export interface RolesResponse{
    OK      : boolean;
    ROLES  ?: Rol[];
    MSG    ?: string;
}

export interface Rol{
    ID_ROL      : number;
    NOMBRE_ROL  : string;
}

