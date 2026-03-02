import { Perfil } from "./perfil";

export class Usuario {
    id!: number;
    nome!: string;
    cpf!: string;
    status!: string; //StatusPadraoEnum
    email!: string;
    senha!: string;
    perfil: Perfil = new Perfil();
    codigoSenhaResetada!: string;
    dataSenhaResetada!: Date;
}