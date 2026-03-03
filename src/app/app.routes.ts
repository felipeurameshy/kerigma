import { Routes } from '@angular/router';
import { Dashboard } from './view/dashboard/dashboard';
import { AppLayout } from './layout/component/app.layout';

import { Login } from './components/login/login';
import { NotFound } from './components/not-found/not-found';
import { AccessDenied } from './components/access-denied/access-denied';
import { SegurancaGuard } from './configuration/security/seguranca.guard';

export const routes: Routes = [
      
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard, canActivate: [SegurancaGuard] },
            { path: 'bairro', loadChildren: () => import('./view/bairro/bairro.routes') },
            { path: 'cargo', loadChildren: () => import('./view/cargo/cargo.routes') },
            { path: 'categoria', loadChildren: () => import('./view/categoria/categoria.routes') },
            { path: 'perfil', loadChildren: () => import('./view/perfil/perfil.routes') },
            { path: 'pessoa', loadChildren: () => import('./view/pessoa/pessoa.routes') },
            { path: 'usuario', loadChildren: () => import('./view/usuario/usuario.routes') }
        ]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'accessDenied',
        component: AccessDenied,
    },
    {
        path: '**',
        redirectTo: 'notfound',
    },
    {
        path: 'notfound',
        component: NotFound,
    }
    
];