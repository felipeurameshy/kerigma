import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { FluidModule } from 'primeng/fluid';
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { MenuList } from '../../../components/menu-list/menu-list';
import { BaseResourceListComponent } from '../../../configuration/generic/components/base-resource-list.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { LoadingService } from '../../../configuration/core/loading.service';
import { AuthorizationService } from '../../../configuration/security/authorization.service';
import { Receita } from '../../../model/receita';
import { ReceitaFilter } from '../../../filter/receita.filter';
import { ReceitaService } from '../../../service/receita.service';
import { Categoria } from '../../../model/categoria';
import { Pessoa } from '../../../model/pessoa';
import { CategoriaFilter } from '../../../filter/categoria.filter';
import { CategoriaService } from '../../../service/categoria.service';
import { PessoaService } from '../../../service/pessoa.service';
import { PessoaFilter } from '../../../filter/pessoa.filter';

@Component({
  selector: 'app-receita-list',
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule,
    ToastModule, MenuList, FluidModule, DatePipe, CurrencyPipe, DatePickerModule, AutoCompleteModule, InputGroupModule,
    InputGroupAddonModule,],
  templateUrl: './receita-list.html',
  styleUrl: './receita-list.scss',
})
export class ReceitaList extends BaseResourceListComponent<Receita, ReceitaFilter> {

  public listaCategorias: Categoria[] = [];
  public listaPessoas: Pessoa[] = [];

  constructor(
    entidadeService: ReceitaService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    authorizationService: AuthorizationService) {
    super(
      entidadeService,
      "/receita",
      "filtroReceita",
      new ReceitaFilter(),
      "Lista de Receitas",
      [{ label: 'Kerigma' }, { label: 'Financeiro' }, { label: 'Lista de Receitas' }],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      authorizationService
    );
  }

  public pesquisarCategoria(event: AutoCompleteCompleteEvent){
    const filtro = new CategoriaFilter();
    filtro.descricao = event.query;
    filtro.itensPorPagina = 10;
    this.categoriaService.pesquisar(filtro)
      .then( dados => {
        if(dados.selecionados){
          this.listaCategorias = dados.selecionados.map((item: any) => ({
            id: item.id,
            descricao: item.descricao
          }));
        }
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  public pesquisarPessoa(event: AutoCompleteCompleteEvent){
    const filtro = new PessoaFilter();
    filtro.nome = event.query;
    filtro.itensPorPagina = 10;
    this.pessoaService.pesquisar(filtro)
      .then( dados => {
        if(dados.selecionados){
          this.listaPessoas = dados.selecionados.map((item: any) => ({
            id: item.id,
            nome: item.nome
          }));
        }
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}