export class DespesaFilter {
  id!: number;
  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date
  pago!: string;
  pagina: number = 0;
  itensPorPagina: number = 0;
}