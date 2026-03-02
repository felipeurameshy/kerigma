import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecimalPipe  } from '@angular/common';

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

import { DashboardService } from '../../service/dashboard.service';
import { LoadingService } from '../../configuration/core/loading.service';
import { ErrorHandlerService } from '../../configuration/core/error-handler.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule, ButtonModule, TooltipModule, FieldsetModule, 
    BreadcrumbModule, FormsModule, InputTextModule, PanelModule,
    ChartModule, SelectModule, DecimalPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  
  itens: MenuItem[] = [
    { label:'Kerigma' },
    { label:'Dashboard' }
  ];

  totalPesquisas: number = 0;
  totalPesquisaFinalizadas: number = 0;
  totalPesquisaPendente: number = 0;
  mediaUltimaPesquisa: number = 0;

  constructor(
    public dashboardService: DashboardService,
    public messageService: MessageService,
    public loadingService: LoadingService,
    public errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.totaisPesquisas();
    this.mediaUltimaPesquisaAplicada();
  }

  totaisPesquisas() {
    this.dashboardService.totaisPesquisas()
      .then(dados => {
        this.totalPesquisas = dados.total;
        this.totalPesquisaFinalizadas = dados.totalFinalizadas;
        this.totalPesquisaPendente = dados.totalPendentes;
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  mediaUltimaPesquisaAplicada() {
    this.dashboardService.mediaUltimaPesquisaAplicada()
      .then(dados => {
        this.mediaUltimaPesquisa = dados.media;
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

/*
  totalBeneficiariosPorMotivo() {
    this.dashboardService.totalBeneficiariosPorMotivo()
      .then((res: any[]) => {
        const labels = res.map(item => `${item.motivo} (${item.quantidade})`);
        const values = res.map(item => item.quantidade);

        this.dataMotivo = {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                '#eb3e86ea', '#70bd0dff','#1f80f0ff', '#14B8A6',
                '#F59E0B', '#EF4444', '#44ef7dff', '#ec9e28ff'
              ],
              hoverBackgroundColor: [
                '#dd0861ea','#10eb10ff', '#1a0be7ff', '#0ad8c0ff',
                '#FBBF24', '#F87171', 'rgba(58, 165, 8, 1)', '#ac6e12ff'
              ]
            }
          ]
        };
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarGraficoInativosMes() {
    this.dashboardService.buscarInativosPorMes()
      .then((res: any[]) => {
        const mesesCompletos = Array.from({ length: 12 }, (_, i) => ({
          mes: i + 1,
          quantidade: 0
        }));

        res.forEach(item => {
          const index = mesesCompletos.findIndex(m => m.mes === item.mes);
          if (index !== -1) {
            mesesCompletos[index].quantidade = item.quantidade;
          }
        });

        const labels = mesesCompletos.map(r => this.nomeMes(r.mes));
        const valores = mesesCompletos.map(r => r.quantidade);

        this.dataInativosMes = {
          labels: labels,
          datasets: [
            {
              label: 'Quantidade de inativos',
              data: valores,
              backgroundColor: '#1381ffff',
              borderColor: '#1f80f0ff',
              borderWidth: 1
            }
          ]
        };

        this.optionsInativosMes = {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        };

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nomeMes(mes: number): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes - 1];
  }*/

}
