import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { FluidModule } from 'primeng/fluid';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuForm } from '../../../components/menu-form/menu-form';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Categoria } from '../../../model/categoria';
import { CategoriaFilter } from '../../../filter/categoria.filter';
import { CategoriaService } from '../../../service/categoria.service';
import { Despesa } from '../../../model/despesa';
import { DespesaService } from '../../../service/despesa.service';
import { Pessoa } from '../../../model/pessoa';
import { PessoaFilter } from '../../../filter/pessoa.filter';
import { PessoaService } from '../../../service/pessoa.service';
import { Enums } from '../../../model/enums';

@Component({
  selector: 'app-despesa-form',
  imports: [FormsModule, CommonModule, MenuForm, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, FluidModule, AutoCompleteModule, InputGroupModule,
    InputGroupAddonModule, DatePickerModule, InputNumberModule, SelectModule],
  templateUrl: './despesa-form.html',
  styleUrl: './despesa-form.scss',
})
export class DespesaForm extends BaseResourceFormComponent<Despesa> {

  public statusPagamento = Enums.StatusPagamento;
  public listaCategorias: Categoria[] = [];
  public listaPessoas: Pessoa[] = [];

  constructor(
    entidadeService: DespesaService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler: ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/despesa/listar",
      "Despesa",
      [{ label: 'Kerigma' }, { label: 'Financeiro' }, { label: 'Despesa' }],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
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