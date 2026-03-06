import { Routes } from '@angular/router';
import { SegurancaGuard } from '../../configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from '../../configuration/security/seguranca.deactivate.guard';
import { DespesaForm } from './despesa-form/despesa-form';
import { DespesaList } from './despesa-list/despesa-list';

export default [

  {
    path: 'novo',
    component: DespesaForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['DESPESA_INCLUIR']}
  },
  {
    path: 'listar',
    component: DespesaList,
    canActivate:[SegurancaGuard],
    data: { roles: ['DESPESA_CONSULTAR']}
  },
  {
    path: 'editar/:id',
    component: DespesaForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['DESPESA_ALTERAR']}
  },
  {
    path: ':id/:consulta/:tipo',
    component: DespesaForm,
    canActivate:[SegurancaGuard],
    data: { roles: ['DESPESA_CONSULTAR']}
  }

] as Routes;
