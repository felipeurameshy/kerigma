import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MenuItem, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { FluidModule } from 'primeng/fluid';
import { DatePickerModule } from 'primeng/datepicker';

import { RelatorioDespesaFilter } from '../../../filter/relatorio-despesa.filter';
import { DespesaService } from '../../../service/despesa.service';
import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { LoadingService } from '../../../configuration/core/loading.service';

@Component({
  selector: 'app-despesa-relatorio',
  imports: [FormsModule, CommonModule, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, FluidModule, DatePickerModule],
  templateUrl: './despesa-relatorio.html',
  styleUrl: './despesa-relatorio.scss',
})
export class DespesaRelatorio implements OnInit {

  items: MenuItem[] = [];  
  tipoRelatorio = 'POR_PERIODO';
  filtro = new RelatorioDespesaFilter();

  constructor(
    public entidadeService: DespesaService,
    private title: Title,
    private errorHandler : ErrorHandlerService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    
    this.items = [      
      {label:'Relatórios'},
      {label:'Despesa'}
    ];

    this.title.setTitle ('SGTI - Relatório de Chamados');
  }

  gerarRelatorio() {
    if(this.tipoRelatorio == 'POR_PERIODO'){
      this.relatorioPorFiltroDetalhado();
    }
  }

  relatorioPorFiltroDetalhado() { 
    if(!this.filtro.inicio && this.filtro.fim){
      this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Informe o Periodo'});
    }else{   
      this.loadingService.show()
      this.entidadeService.relatorioPorPeriodo(this.filtro)
        .then(relatorio => {      
          if(relatorio){
            const url = window.URL.createObjectURL(relatorio);  
            var element = document.createElement("a");
            element.download = "Relatorio de despesa por período detalhado.pdf";
            element.href = url;
            element.click();      
            this.loadingService.hide(); 
          }
        })
        .catch(erro => {
          this.errorHandler.handle(erro);
          this.loadingService.hide(); 
        }); 
      }
    }

}