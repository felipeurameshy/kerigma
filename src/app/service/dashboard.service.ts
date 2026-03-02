import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiPath = `${environment.apiUrl}/dashboard`;

    constructor(
    private http: HttpClient
  ) {}

  totaisPesquisas(): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(`${this.apiPath}/totais-pesquisas`)
    );
  }

  mediaUltimaPesquisaAplicada(): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(`${this.apiPath}/media-ultima-pesquisa-aplicada`)
    );
  }
}