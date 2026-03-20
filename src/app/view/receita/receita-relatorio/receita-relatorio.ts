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

import { ErrorHandlerService } from '../../../configuration/core/error-handler.service';
import { LoadingService } from '../../../configuration/core/loading.service';
import { RelatorioReceitaFilter } from '../../../filter/relatorio-receita.filter';
import { ReceitaService } from '../../../service/receita.service';

@Component({
  selector: 'app-receita-relatorio',
  imports: [FormsModule, CommonModule, InputTextModule, ButtonModule, TooltipModule,
    FieldsetModule, BreadcrumbModule, ToastModule, FluidModule, DatePickerModule],
  templateUrl: './receita-relatorio.html',
  styleUrl: './receita-relatorio.scss',
})
export class ReceitaRelatorio implements OnInit {

  items: MenuItem[] = [];  
  tipoRelatorio = 'POR_PERIODO';
  filtro = new RelatorioReceitaFilter();

  constructor(
    public entidadeService: ReceitaService,
    private title: Title,
    private errorHandler : ErrorHandlerService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    
    this.items = [{label:'Kerigma'}, {label:'Relatórios'}, {label:'Receita'}];

    this.title.setTitle ('Kerigma - Relatório de Receitas');
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
            element.download = "Relatorio de receita por período detalhado.pdf";
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