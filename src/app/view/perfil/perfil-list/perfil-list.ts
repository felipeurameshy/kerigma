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
import { PerfilService } from '../../../service/perfil.service';
import { Perfil } from '../../../model/perfil';
import { PerfilFilter } from '../../../filter/perfil.filter';

@Component({
  selector: 'app-perfil-list',
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule,
    ToastModule, MenuList, FluidModule],
  templateUrl: './perfil-list.html',
  styleUrl: './perfil-list.scss',
})
export class PerfilList extends BaseResourceListComponent<Perfil, PerfilFilter> {

  constructor(
    entidadeService: PerfilService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    authorizationService: AuthorizationService) {
    super(
      entidadeService,
      "/perfil",
      "filtroPerfil",
      new PerfilFilter(),
      "Lista de Perfis",
      [{ label: 'Kerigma' }, { label: 'Segurança' }, { label: 'Lista de Perfis' }],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      authorizationService
    );
  }

}