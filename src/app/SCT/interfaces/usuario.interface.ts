import { Usuario } from "src/app/auth/interfaces/auth.interface";

export interface UsuarioResponse{
    OK           : boolean;
    USUARIOS    ?: Usuario[];
    MSG         ?: string;
}

