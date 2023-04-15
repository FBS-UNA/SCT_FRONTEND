export interface LoginForm {
    CEDULA: string;
    CONTRASENA: string;
}


export interface AuthResponse {

    OK         : boolean;
    MSG       ?: boolean;
    CEDULA    ?: string;
    NOMBRE    ?: string;
    APELLIDO_1?: string;
    APELLIDO_2?: string;
    ROL       ?: string;
    TOKEN     ?: string;

}

export interface Usuario {
    CEDULA          : string;
    NOMBRE          : string;
    APELLIDO_1      : string;
    APELLIDO_2      : string;
    NOMBRE_COMPLETO : string;
    ROL             : string;
    FECHA_NAC      ?: Date | string;
}