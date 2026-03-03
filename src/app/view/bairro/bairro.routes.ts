import { Routes } from '@angular/router';
import { SegurancaGuard } from '../../configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from '../../configuration/security/seguranca.deactivate.guard';
import { BairroForm } from './bairro-form/bairro-form';
import { BairroList } from './bairro-list/bairro-list';

export default [

  {
    path: 'novo',
    component: BairroForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['BAIRRO_INCLUIR']}
  },
  {
    path: 'listar',
    component: BairroList,
    canActivate:[SegurancaGuard],
    data: { roles: ['BAIRRO_CONSULTAR']}
  },
  {
    path: 'editar/:id',
    component: BairroForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['BAIRRO_ALTERAR']}
  },
  {
    path: ':id/:consulta/:tipo',
    component: BairroForm,
    canActivate:[SegurancaGuard],
    data: { roles: ['BAIRRO_CONSULTAR']}
  }

] as Routes;
