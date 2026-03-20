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
import { TableModule } from 'primeng/table';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuForm } from '../../../components/menu-form/menu-form';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Enums } from '../../../model/enums';
import { Pessoa, PessoaCargo } from '../../../model/pessoa';
import { PessoaService } from '../../../service/pessoa.service';
import { Bairro } from '../../../model/bairro';
import { BairroService } from '../../../service/bairro.service';
import { BairroFilter } from '../../../filter/bairro.filter';
import { Cargo } from '../../../model/cargo';
import { CargoFilter } from '../../../filter/cargo.filter';
import { CargoService } from '../../../service/cargo.service';

@Component({
  selector: 'app-pessoa-form',
  imports: [FormsModule, CommonModule, MenuForm, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, FluidModule, SelectModule, AutoCompleteModule, 
    InputMaskModule, DatePickerModule, TableModule],
  templateUrl: './pessoa-form.html',
  styleUrl: './pessoa-form.scss',
})
export class PessoaForm extends BaseResourceFormComponent<Pessoa> {

  public tiposEstadoCivil = Enums.EstadoCivil;
  public tiposSexo = Enums.Sexo;
  public tiposDizimos = Enums.Dizimista;
  public tiposStatus = Enums.StatusPadrao;

  public listaBairros: Bairro[] = [];
  public listaCargos: Cargo[] = [];

  pessoaCargo!: PessoaCargo;
  formularioPessoaCargoInvalido: boolean = false;

  constructor(
    entidadeService: PessoaService,
    private bairroService: BairroService,
    private cargoService: CargoService,
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

  override configurarFormulario(): void {
    this.entidade.dataCadastro = new Date();
    this.entidade.cargos = new Array<PessoaCargo>();
    this.pessoaCargo = new PessoaCargo();
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

  public pesquisarCargo(event: AutoCompleteCompleteEvent){
    const filtro = new CargoFilter();
    filtro.descricao = event.query;
    filtro.itensPorPagina = 10;
    this.cargoService.pesquisar(filtro)
      .then( dados => {
        if(dados.selecionados){
          this.listaCargos = dados.selecionados.map((item: any) => ({
            id: item.id,
            descricao: item.descricao
          }));
        }
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  adicionarPessoaCargo(pessoaCargo: PessoaCargo) {

    if (pessoaCargo.cargo) {

      let itemEncontrado = false
      for (let i = 0; i < this.entidade.cargos.length; i++) {
        if (this.entidade.cargos[i].cargo.id === pessoaCargo.cargo.id) {
          itemEncontrado = true;
          this.messageService.add({ severity: 'warn', summary: 'Aviso!', detail: 'Cargo já existe' });
        }
      }

      if (!itemEncontrado) {
        this.entidade.cargos.push(pessoaCargo);
        this.pessoaCargo = new PessoaCargo();
        this.formularioPessoaCargoInvalido = false;
      }
    } else {
      this.formularioPessoaCargoInvalido = true;
      this.messageService.add({ severity: 'warn', summary: 'Aviso!', detail: 'Informe o cargo' });
    }

  }

  excluirPessoaCargo(pessoaCargo: PessoaCargo) {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: ${pessoaCargo.cargo.descricao}`,
      accept: (() => {
        let index = 0;
        for (let i = 0; i < this.entidade.cargos.length; i++) {
          if (this.entidade.cargos[i].cargo.id === pessoaCargo.cargo.id) {
            index = this.entidade.cargos.indexOf(this.entidade.cargos[i]);
          }
        }
        if (index != null) {
          if (this.entidade.cargos.length == 1) {
            this.entidade.cargos = new Array<PessoaCargo>();
          } else {
            this.entidade.cargos.splice(index, 1);
          }
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cargo excluído da lista' });
        }
      })
    });
  }

}