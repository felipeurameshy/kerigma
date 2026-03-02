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
import { Usuario } from '../../../model/usuario';
import { UsuarioFilter } from '../../../filter/usuario.filter';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuario-list',
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule,
    ToastModule, MenuList, FluidModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.scss',
})
export class UsuarioList extends BaseResourceListComponent<Usuario, UsuarioFilter> {

  constructor(
    entidadeService: UsuarioService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    authorizationService: AuthorizationService) {
    super(
      entidadeService,
      "/usuario",
      "filtroUsuario",
      new UsuarioFilter(),
      "Lista de Usuários",
      [{ label: 'Kerigma' }, { label: 'Segurança' }, { label: 'Lista de Usuários' }],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      authorizationService
    );
  }

}