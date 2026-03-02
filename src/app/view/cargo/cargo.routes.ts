import { Routes } from '@angular/router';
import { SegurancaGuard } from '../../configuration/security/seguranca.guard';
import { SegurancaDeactivateGuard } from '../../configuration/security/seguranca.deactivate.guard';
import { CargoForm } from './cargo-form/cargo-form';
import { CargoList } from './cargo-list/cargo-list';

export default [

  {
    path: 'novo',
    component: CargoForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['CARGO_INCLUIR']}
  },
  {
    path: 'listar',
    component: CargoList,
    canActivate:[SegurancaGuard],
    data: { roles: ['CARGO_CONSULTAR']}
  },
  {
    path: 'editar/:id',
    component: CargoForm,
    canActivate:[SegurancaGuard],
    canDeactivate: [SegurancaDeactivateGuard],
    data: { roles: ['CARGO_ALTERAR']}
  },
  {
    path: ':id/:consulta/:tipo',
    component: CargoForm,
    canActivate:[SegurancaGuard],
    data: { roles: ['CARGO_CONSULTAR']}
  }

] as Routes;
