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

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuForm } from '../../../components/menu-form/menu-form';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Cargo } from '../../../model/cargo';
import { CargoService } from '../../../service/cargo.service';

@Component({
  selector: 'app-cargo-form',
  imports: [FormsModule, CommonModule, MenuForm, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, FluidModule],
  templateUrl: './cargo-form.html',
  styleUrl: './cargo-form.scss',
})
export class CargoForm extends BaseResourceFormComponent<Cargo> {

  constructor(
    entidadeService: CargoService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler: ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/cargo/listar",
      "Cargo",
      [{ label: 'Kerigma' }, { label: 'Cadastro' }, { label: 'Cargo' }],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
    );
  }

}