import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyPipe  } from '@angular/common';

import { MessageService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';

import { DashboardService } from '../../service/dashboard.service';
import { LoadingService } from '../../configuration/core/loading.service';
import { ErrorHandlerService } from '../../configuration/core/error-handler.service';
import { DashboardFilter } from '../../filter/dashboard.filter';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule, ButtonModule, TooltipModule, FieldsetModule, 
    BreadcrumbModule, FormsModule, InputTextModule, PanelModule,
    ChartModule, SelectModule, CurrencyPipe, DatePickerModule, FluidModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  
  itens: MenuItem[] = [
    { label:'Kerigma' },
    { label:'Dashboard' }
  ];

  dashboardfilter!: DashboardFilter;
  saldoCaixaGeral: number = 0;
  receitaPeriodo: number = 0;
  despesasPagaPeriodo: number = 0;
  despesasPendentePeriodo: number = 0;
  saldoPeriodo: number = 0;

  constructor(
    public dashboardService: DashboardService,
    public messageService: MessageService,
    public loadingService: LoadingService,
    public errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.dashboardfilter = new DashboardFilter();
    this.dashboardfilter.dataInicio = new Date();
    this.dashboardfilter.dataInicio.setDate(1);
    this.dashboardfilter.dataFim = new Date();

    this.saldoGeral();
    this.movimentacaoPorPeriodo();
  }

  saldoGeral() {
    this.dashboardService.saldoGeral()
      .then(dados => {
        this.saldoCaixaGeral = dados;
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  movimentacaoPorPeriodo() {

    if(!this.dashboardfilter.dataInicio && !this.dashboardfilter.dataFim){
      this.messageService.add({ severity: 'warn', summary: 'Aviso!', detail: 'Informe o período' });
    }else{
      this.dashboardService.movimentacaoPorPeriodo(this.dashboardfilter)
        .then(dados => {
          this.receitaPeriodo = dados.receitaPeriodo;
          this.despesasPagaPeriodo = dados.despesasPagaPeriodo;
          this.despesasPendentePeriodo = dados.despesasPendentePeriodo;
          this.saldoPeriodo = dados.saldoPeriodo;
        })
        .catch(erro => {
          this.errorHandler.handle(erro);
        });
    }
  }

}
