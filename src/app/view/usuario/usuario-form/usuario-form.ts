import { Component } from '@angular/core';
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
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

import { BaseResourceFormComponent } from '../../../configuration/generic/components/base-resource-form.component';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { MenuForm } from '../../../components/menu-form/menu-form';
import { LoadingService } from '../../../configuration/core/loading.service';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { Enums } from '../../../model/enums';
import { Perfil } from '../../../model/perfil';
import { PerfilService } from '../../../service/perfil.service';
import { PerfilFilter } from '../../../filter/perfil.filter';

@Component({
  selector: 'app-usuario-form',
  imports: [FormsModule, CommonModule, MenuForm, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, FluidModule, SelectModule, InputMaskModule, PasswordModule, AutoCompleteModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})
export class UsuarioForm extends BaseResourceFormComponent<Usuario> {

  public tiposStatus = Enums.StatusPadrao;
  public senhaConfirma!: string;
  public listaPerfis: Perfil[] = [];

  constructor(
    private entidadeService: UsuarioService,
    private perfilService: PerfilService,
    route: ActivatedRoute,
    router: Router,
    messageService: MessageService,
    title: Title,
    errorHandler: ErrorHandlerService,
    loadingService: LoadingService,
    confirmation: ConfirmationService) {
    super(
      entidadeService,
      "/usuario/listar",
      "Usuário",
      [{ label: 'Kerigma' }, { label: 'Segurança' }, { label: 'Usuário' }],
      route,
      router,
      messageService,
      title,
      errorHandler,
      loadingService,
      confirmation
    );
  }
  
  override buscar(id: number) {
    this.loadingService.show();
    this.resourceService.buscar(id)
      .then( dados => {
        this.entidade = dados;
        this.senhaConfirma = dados.senha;
        this.inicializarObjetosNulosBuscar(this.entidade);
        if(this.consulta){
          this.title.setTitle (`Kerigma - Consulta ${this.nomeTitle}`);
        }else{
          this.title.setTitle (`Kerigma - Alteração ${this.nomeTitle}`);
        }
        this.loadingService.hide();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
        this.loadingService.hide();
      });
  }

  override salvar(form: FormControl) {
    if (this.verificarSenhaValida()) {
      super.salvar(form);
    }
  }

  public verificarSenhaValida(): boolean {
    if (this.entidade.senha != this.senhaConfirma) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'As senhas são diferentes' });
      return false;
    } else {
      return true;
    }
  }

  public pesquisarPerfil(event: AutoCompleteCompleteEvent){
    const perfilFilter = new PerfilFilter();
    perfilFilter.descricao = event.query;
    perfilFilter.itensPorPagina = 10;
    this.perfilService.pesquisar(perfilFilter)
      .then( dados => {
        this.listaPerfis = dados.selecionados;
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}