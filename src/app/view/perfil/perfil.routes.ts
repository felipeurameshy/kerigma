import { Routes } from '@angular/router';
import { SegurancaGuard } from '../../configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from '../../configuration/security/seguranca.deactivate.guard';
import { PerfilForm } from './perfil-form/perfil-form';
import { PerfilList } from './perfil-list/perfil-list';

export default [

  {
    path: 'novo',
    component: PerfilForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PERFIL_INCLUIR']}
  },
  {
    path: 'listar',
    component: PerfilList,
    canActivate:[SegurancaGuard],
    data: { roles: ['PERFIL_CONSULTAR']}
  },
  {
    path: 'editar/:id',
    component: PerfilForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['PERFIL_ALTERAR']}
  },
  {
    path: ':id/:consulta/:tipo',
    component: PerfilForm,
    canActivate:[SegurancaGuard],
    data: { roles: ['PERFIL_CONSULTAR']}
  }

] as Routes;