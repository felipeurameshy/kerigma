import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Despesa } from '../model/despesa';
import { DespesaFilter } from '../filter/despesa.filter';

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

    if (filtro.id) {
      params = params.set('id', filtro.id.toString());
    }

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return firstValueFrom(this.http.get(`${this.apiPath}/pesquisar`, { params }))
      .then((response: any) => {
        const resultado = {
          selecionados: response['content'],
          total: response['totalElements']
        }
        return resultado;
      });
  }

}