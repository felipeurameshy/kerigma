import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Receita } from '../model/receita';
import { ReceitaFilter } from '../filter/receita.filter';

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