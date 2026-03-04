import { Cargo } from "./cargo";

export class Pessoa {
    id!: number;
    dataCadastro!: Date;
    nome!: string;
    cpf!: string;
    rg!: string;
    estadoCivil!: string; //EstadoCivilEnum
    sexo!: string; //SexoEnum
    dizimista!: string; //DizimistaEnum
    status!: string; //StatusEnum
    endereco!: string;
    bairro!: string;
    telefoneResidencial!: string;
    telefoneCelular01!: string;
    telefoneCelular02!: string;
    email!: string;
    dataMembro!: Date;
    dataBatismo!: Date;
    dataConversao!: Date;
    dataSaida!: Date;
    observacao!: string;
    cargos = new Array<PessoaCargo>();
}

export class PessoaCargo {
    id!: number;
    cargo!: Cargo;

}