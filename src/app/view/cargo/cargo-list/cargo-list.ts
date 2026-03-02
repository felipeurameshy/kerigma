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
import { CargoService } from '../../../service/cargo.service';
import { Cargo } from '../../../model/cargo';
import { CargoFilter } from '../../../filter/cargo.filter';

@Component({
  selector: 'app-cargo-list',
  imports: [FormsModule, InputTextModule, ButtonModule, TableModule, TooltipModule, FieldsetModule, BreadcrumbModule,
    ToastModule, MenuList, FluidModule],
  templateUrl: './cargo-list.html',
  styleUrl: './cargo-list.scss',
})
export class CargoList extends BaseResourceListComponent<Cargo, CargoFilter> {

  constructor(
    entidadeService: CargoService,
    title: Title,
    messageService: MessageService,
    errorHandler: ErrorHandlerService,
    router: Router,
    loadingService: LoadingService,
    authorizationService: AuthorizationService) {
    super(
      entidadeService,
      "/cargo",
      "filtroCargo",
      new CargoFilter(),
      "Lista de Cargos",
      [{ label: 'Kerigma' }, { label: 'Cadastro' }, { label: 'Lista de Cargos' }],
      title,
      messageService,
      errorHandler,
      router,
      loadingService,
      authorizationService
    );
  }

}