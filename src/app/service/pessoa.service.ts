import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Pessoa } from '../model/pessoa';
import { PessoaFilter } from '../filter/pessoa.filter';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseResourceService<Pessoa> {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/pessoa`, http);
  }

  override pesquisar(filtro: PessoaFilter): Promise<any> {

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if (filtro.id) {
      params = params.set('id', filtro.id.toString());
    }

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
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