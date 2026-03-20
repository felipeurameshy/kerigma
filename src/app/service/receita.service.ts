import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import moment from 'moment';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Receita } from '../model/receita';
import { ReceitaFilter } from '../filter/receita.filter';
import { RelatorioReceitaFilter } from '../filter/relatorio-receita.filter';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService extends BaseResourceService<Receita> {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/receita`, http);
  }

  override pesquisar(filtro: ReceitaFilter): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    let filtroNovo = {
      id: filtro.id,
      descricao: filtro.descricao,
      dataInicio: filtro.dataInicio,
      dataFim: filtro.dataFim,
      pessoaId: filtro.pessoa ? filtro.pessoa.id : null,
      categoriaId: filtro.categoria ? filtro.categoria.id : null
    }

    return firstValueFrom(this.http.post(`${this.apiPath}/pesquisar`, filtroNovo, { params }))
      .then((response: any) => {
        const resultado = {
          selecionados: response['content'],
          total: response['totalElements']
        }
        return resultado;
      });
  }

    override buscar(id: number): Promise<Receita> {
      return firstValueFrom(this.http.get<Receita>(`${this.apiPath}/${id}`))
        .then((response: any) => {
          this.converterStringsParaDatas([response]);
          return response;
        });
    }
  
    relatorioPorPeriodo(filtro: RelatorioReceitaFilter) {
      return firstValueFrom(this.http.post<Blob>(`${this.apiPath}/relatorios/periodo`,
      filtro, { responseType: 'blob' as 'json' }));
    }
  
    private converterStringsParaDatas(lista: Receita[]) {
  
      for (const entidade of lista) {
  
        if (entidade.data) entidade.data = moment(entidade.data, 'YYYY-MM-DD').toDate();
  
      }
    }

}