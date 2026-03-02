import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { FluidModule } from 'primeng/fluid';
import { PickList, PickListModule } from 'primeng/picklist';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuForm } from '../../../components/menu-form/menu-form';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Perfil, PerfilPermissao } from '../../../model/perfil';
import { PerfilService } from '../../../service/perfil.service';
import { Permissao } from '../../../model/permissao';
import { PermissaoService } from '../../../service/permissao.service';

@Component({
  selector: 'app-perfil-form',
  imports: [FormsModule, CommonModule, MenuForm, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, FluidModule, PickListModule],
  templateUrl: './perfil-form.html',
  styleUrl: './perfil-form.scss',
})
export class PerfilForm extends BaseResourceFormComponent<Perfil> {

  permissoes: Permissao[] = [];
  permissoesSelecionadas: Permissao[] = [];

  @ViewChild('pickList') pickList!: PickList;

  constructor(
    entidadeService: PerfilService,
    private permissaoService: PermissaoService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler: ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/perfil/listar",
      "Perfil",
      [{ label: 'Kerigma' }, { label: 'Segurança' }, { label: 'Perfil' }],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
    );
  }

  override ngOnInit(): void {
    this.items = this.itensMenu;

    this.idEntidade = this.route.snapshot.params['id'];
    this.consulta = this.route.snapshot.params['consulta'];
    this.tipoMenu = this.route.snapshot.params['tipo'];

    this.configurarFormulario();

    if (this.idEntidade) {
      this.buscar(this.idEntidade);
    } else {
      this.title.setTitle('Kerigma - Inclusão ' + this.nomeTitle);
      this.carregarPermissoes();
    }
  }

  override buscar(codigo: number) {
    this.loadingService.show();
    this.resourceService.buscar(codigo)
      .then(dados => {
        this.entidade = dados;
        this.preencherPermissaoPerfil(dados);
        this.carregarPermissoes();
        if (this.consulta) {
          this.title.setTitle(`Kerigma - Consulta ${this.nomeTitle}`);
        } else {
          this.title.setTitle(`Kerigma - Alteração ${this.nomeTitle}`);
        }
        this.loadingService.hide();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.loadingService.hide();
      });
  }

  override configurarFormulario() {
    this.entidade.permissoes = new Array<PerfilPermissao>();
  }

  override salvar(form: FormControl) {
    if (this.verificarFormularioValido(form)) {
      this.preencherPermissaoPerfilParaSalvar();
      if (this.entidade.id) {
        this.alterar(form);
      } else {
        this.incluir(form);
      }
    }
  }

  preencherPermissaoPerfilParaSalvar() {
    this.entidade.permissoes = this.permissoesSelecionadas.map(permissao => {
      const perfilPermissao = new PerfilPermissao();
      perfilPermissao.permissao = permissao;
      return perfilPermissao;
    });
  }

  preencherPermissaoPerfil(dados: any) {
    if (dados.permissoes) {
      this.permissoesSelecionadas = dados.permissoes.map((p: any) => p.permissao);
    }
  }

  carregarPermissoes() {
    this.loadingService.show();
    this.permissaoService.listar()
      .then(dados => {
        this.permissoes = dados.filter((p:any) => !this.permissoesSelecionadas.some(s => s.id === p.id));
        this.loadingService.hide();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.loadingService.hide();
      });
  }

  atualizarPermissaoSelecionadas() {
    this.permissoesSelecionadas = [...this.permissoesSelecionadas];
    this.permissoes = [...this.permissoes];
  }

  adicionarTodasPermissoes(){
    this.permissoesSelecionadas = this.pickList.target ? this.pickList.target() : [];
  }

}