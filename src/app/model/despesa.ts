import { Categoria } from "./categoria";
import { Pessoa } from "./pessoa";

export class Despesa {
    id!: number;
    descricao!: string;
    dataVencimento!: Date;
    categoria!: Categoria;
    valor!: number;
    pessoa!: Pessoa;
    pago!: string; //StatusPagamentoEnum
    dataPagamento!: Date;
}