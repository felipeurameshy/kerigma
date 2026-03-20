import { Categoria } from "../model/categoria";
import { Pessoa } from "../model/pessoa";

export class ReceitaFilter {
  id!: number;
  descricao!: string;
  dataInicio!: Date;
  dataFim!: Date;
  categoria!: Categoria;
  pessoa!: Pessoa;
  pagina: number = 0;
  itensPorPagina: number = 0;
}