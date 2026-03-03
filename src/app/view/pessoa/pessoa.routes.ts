import { Routes } from '@angular/router';
import { SegurancaGuard } from '../../configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from '../../configuration/security/seguranca.deactivate.guard';
import { PessoaForm } from './pessoa-form/pessoa-form';
import { PessoaList } from './pessoa-list/pessoa-list';

export default [

  {
    path: 'novo',
    component: PessoaForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PESSOA_INCLUIR']}
  },
  {
    path: 'listar',
    component: PessoaList,
    canActivate:[SegurancaGuard],
    data: { roles: ['PESSOA_CONSULTAR']}
  },
  {
    path: 'editar/:id',
    component: PessoaForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PESSOA_ALTERAR']}
  },
  {
    path: ':id/:consulta/:tipo',
    component: PessoaForm,
    canActivate:[SegurancaGuard],
    data: { roles: ['PESSOA_CONSULTAR']}
  }

] as Routes;
