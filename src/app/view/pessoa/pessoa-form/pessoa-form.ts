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
import { SelectModule } from 'primeng/select';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuForm } from '../../../components/menu-form/menu-form';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Enums } from '../../../model/enums';
import { Pessoa } from '../../../model/pessoa';
import { PessoaService } from '../../../service/pessoa.service';
import { Bairro } from '../../../model/bairro';
import { BairroService } from '../../../service/bairro.service';
import { BairroFilter } from '../../../filter/bairro.filter';

@Component({
  selector: 'app-pessoa-form',
  imports: [FormsModule, CommonModule, MenuForm, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, FluidModule, SelectModule, AutoCompleteModule, 
    InputMaskModule, DatePickerModule],
  templateUrl: './pessoa-form.html',
  styleUrl: './pessoa-form.scss',
})
export class PessoaForm extends BaseResourceFormComponent<Pessoa> {

  public tiposEstadoCivil = Enums.EstadoCivil;
  public tiposSexo = Enums.Sexo;
  public tiposDizimos = Enums.Dizimista;
  public tiposStatus = Enums.StatusPadrao;

  public listaBairros: Bairro[] = [];

  constructor(
    entidadeService: PessoaService,
    private bairroService: BairroService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler: ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/pessoa/listar",
      "Pessoa",
      [{ label: 'Kerigma' }, { label: 'Cadastro' }, { label: 'Pessoa' }],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
    );
  }

  public pesquisarBairro(event: AutoCompleteCompleteEvent){
    const filtro = new BairroFilter();
    filtro.descricao = event.query;
    filtro.itensPorPagina = 10;
    this.bairroService.pesquisar(filtro)
      .then( dados => {
        if(dados.selecionados){
          this.listaBairros = dados.selecionados.map((item: any) => ({
            id: item.id,
            descricao: item.descricao
          }));
        }
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}