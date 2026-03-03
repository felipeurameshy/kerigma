import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { FluidModule } from 'primeng/fluid';

import { MenuList } from '../../../components/menu-list/menu-list';
import { BaseResourceListComponent } from '../../../configuration/generic/components/base-resource-list.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { LoadingService } from '../../../configuration/core/loading.service';
import { AuthorizationService } from '../../../configuration/security/authorization.service';
import { Pessoa } from '../../../model/pessoa';
import { PessoaFilter } from '../../../filter/pessoa.filter';
import { PessoaService } from '../../../service/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule,
    ToastModule, MenuList, FluidModule],
  templateUrl: './pessoa-list.html',
  styleUrl: './pessoa-list.scss',
})
export class PessoaList extends BaseResourceListComponent<Pessoa, PessoaFilter> {

  constructor(
    entidadeService: PessoaService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    authorizationService: AuthorizationService) {
    super(
      entidadeService,
      "/pessoa",
      "filtroPessoa",
      new PessoaFilter(),
      "Lista de Pessoas",
      [{ label: 'Kerigma' }, { label: 'Cadastro' }, { label: 'Lista de Pessoas' }],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      authorizationService
    );
  }

}
