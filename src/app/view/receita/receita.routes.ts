import { Routes } from '@angular/router';
import { SegurancaGuard } from '../../configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from '../../configuration/security/seguranca.deactivate.guard';
import { ReceitaForm } from './receita-form/receita-form';
import { ReceitaList } from './receita-list/receita-list';

export default [

  {
    path: 'novo',
    component: ReceitaForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['RECEITA_INCLUIR']}
  },
  {
    path: 'listar',
    component: ReceitaList,
    canActivate:[SegurancaGuard],
    data: { roles: ['RECEITA_CONSULTAR']}
  },
  {
    path: 'editar/:id',
    component: ReceitaForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['RECEITA_ALTERAR']}
  },
  {
    path: ':id/:consulta/:tipo',
    component: ReceitaForm,
    canActivate:[SegurancaGuard],
    data: { roles: ['RECEITA_CONSULTAR']}
  }

] as Routes;
