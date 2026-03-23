import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { DashboardFilter } from '../filter/dashboard.filter';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiPath = `${environment.apiUrl}/dashboard`;

  constructor(
    private http: HttpClient
  ) {}

  saldoGeral(): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiPath}/saldo-geral`));
  }

  movimentacaoPorPeriodo(dashboardfilter: DashboardFilter): Promise<any> {

    const dataInicio = dashboardfilter.dataInicio.toISOString().split('T')[0];
    const dataFim = dashboardfilter.dataFim.toISOString().split('T')[0];

    let params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);

    return firstValueFrom(this.http.get<any>(`${this.apiPath}/movimentacao-por-periodo`, {params}));
  }
}