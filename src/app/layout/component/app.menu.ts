import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthorizationService } from '../../configuration/security/authorization.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            @if(item.separator){
                <li class="menu-separator"></li>
            }
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    constructor(
        private authorizationService: AuthorizationService
    ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                visible: this.authorizationService.temPermissao('MENU_DASHBOARD'),
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/'] }]
            },
            {
                label: 'Cadastro',
                visible: this.authorizationService.temPermissao('MENU_CADASTRO'),
                items: [
                    { label: 'Cargo', icon: 'pi pi-fw pi-id-card', routerLink: ['/cargo/listar'], visible: this.authorizationService.temPermissao('CARGO_CONSULTAR') }
                ]
            },
            {
                label: 'Segurança',
                visible: this.authorizationService.temPermissao('MENU_SEGURANCA'),
                items: [
                    { label: 'Perfil', icon: 'pi pi-fw pi-key', routerLink: ['/perfil/listar'], visible: this.authorizationService.temPermissao('PERFIL_CONSULTAR') },
                    { label: 'Usuário', icon: 'pi pi-fw pi-users', routerLink: ['/usuario/listar'], visible: this.authorizationService.temPermissao('USUARIO_CONSULTAR') },
                ]
            },
            {
                label: 'Relatórios',
                visible: this.authorizationService.temPermissao('MENU_RELATORIO'),
                items: [
                    { label: 'Financeiro', icon: 'pi pi-fw pi-chart-line', routerLink: ['/pesquisa-desempenho/relatorio'], visible: this.authorizationService.temPermissao('PESQUISA_DESEMPENHO_RELATORIO') },
                ]
            }
        ];
    }
}
