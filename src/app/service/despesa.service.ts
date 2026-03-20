import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import moment from 'moment';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Despesa } from '../model/despesa';
import { DespesaFilter } from '../filter/despesa.filter';
import { RelatorioDespesaFilter } from '../filter/relatorio-despesa.filter';

@Injectable({
  providedIn: 'root'
})
export class DespesaService extends BaseResourceService<Despesa> {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/despesa`, http);
  }

  override pesquisar(filtro: DespesaFilter): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);


    return firstValueFrom(this.http.post(`${this.apiPath}/pesquisar`, filtro, { params }))
      .then((response: any) => {
        const resultado = {
          selecionados: response['content'],
          total: response['totalElements']
        }
        return resultado;
      });
  }

  override buscar(id: number): Promise<Despesa> {
    return firstValueFrom(this.http.get<Despesa>(`${this.apiPath}/${id}`))
      .then((response: any) => {
        this.converterStringsParaDatas([response]);
        return response;
      });
  }

  relatorioPorPeriodo(filtro: RelatorioDespesaFilter) {
    return firstValueFrom(this.http.post<Blob>(`${this.apiPath}/relatorios/periodo`,
    filtro, { responseType: 'blob' as 'json' }));
  }

  private converterStringsParaDatas(lista: Despesa[]) {

    for (const entidade of lista) {

      if (entidade.dataPagamento) entidade.dataPagamento = moment(entidade.dataPagamento, 'YYYY-MM-DD').toDate();
      if (entidade.dataVencimento) entidade.dataVencimento = moment(entidade.dataVencimento, 'YYYY-MM-DD').toDate();

    }
  }

}