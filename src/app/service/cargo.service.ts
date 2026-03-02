import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { BaseResourceService } from '../configuration/generic/service/base-resource.service';
import { Cargo } from '../model/cargo';
import { CargoFilter } from '../filter/cargo.filter';

@Injectable({
  providedIn: 'root'
})
export class CargoService extends BaseResourceService<Cargo> {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/cargo`, http);
  }

  override pesquisar(filtro: CargoFilter): Promise<any> {

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