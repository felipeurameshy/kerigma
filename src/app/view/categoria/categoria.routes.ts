import { Routes } from '@angular/router';
import { SegurancaGuard } from '../../configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from '../../configuration/security/seguranca.deactivate.guard';
import { CategoriaForm } from './categoria-form/categoria-form';
import { CategoriaList } from './categoria-list/categoria-list';

export default [

  {
    path: 'novo',
    component: CategoriaForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['CATEGORIA_INCLUIR']}
  },
  {
    path: 'listar',
    component: CategoriaList,
    canActivate:[SegurancaGuard],
    data: { roles: ['CATEGORIA_CONSULTAR']}
  },
  {
    path: 'editar/:id',
    component: CategoriaForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['CATEGORIA_ALTERAR']}
  },
  {
    path: ':id/:consulta/:tipo',
    component: CategoriaForm,
    canActivate:[SegurancaGuard],
    data: { roles: ['CATEGORIA_CONSULTAR']}
  }

] as Routes;
