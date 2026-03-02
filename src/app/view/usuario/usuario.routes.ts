import { Routes } from '@angular/router';
import { SegurancaGuard } from '../../configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from '../../configuration/security/seguranca.deactivate.guard';
import { UsuarioForm } from './usuario-form/usuario-form';
import { UsuarioList } from './usuario-list/usuario-list';

export default [

  {
    path: 'novo',
    component: UsuarioForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['USUARIO_INCLUIR']}
  },
  {
    path: 'listar',
    component: UsuarioList,
    canActivate:[SegurancaGuard],
    data: { roles: ['USUARIO_CONSULTAR']}
  },
  {
    path: 'editar/:id',
    component: UsuarioForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['USUARIO_ALTERAR']}
  },
  {
    path: ':id/:consulta/:tipo',
    component: UsuarioForm,
    canActivate:[SegurancaGuard],
    data: { roles: ['USUARIO_CONSULTAR']}
  }

] as Routes;