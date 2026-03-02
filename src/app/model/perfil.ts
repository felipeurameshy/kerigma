import { Permissao } from "./permissao";

export class Perfil {
  id!: number;
  descricao!: string;
  permissoes = new Array<PerfilPermissao>();
}

export class PerfilPermissao {
  id!: number;
  permissao = new Permissao();
}