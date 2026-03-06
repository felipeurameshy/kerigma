import { Categoria } from "./categoria";
import { Pessoa } from "./pessoa";

export class Receita {
    id!: number;
    descricao!: string;
    data!: Date;
    categoria!: Categoria;
    valor!: number;
    pessoa!: Pessoa;
}