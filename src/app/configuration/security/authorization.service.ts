import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { firstValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHandler: ErrorHandlerService,
  ) {
    this.carregarToken();
  }

  public login(email: string, senha: string): Promise<void> {
    let body = {
      'email':email,
      'senha':senha
    }
    return firstValueFrom(this.http.post<any>(`${environment.apiUrl}/authentication/login`, body))
    .then(response => {
      this.armazenarToken(response.token);
    })
    .catch((error: HttpErrorResponse) => {
      if (error.status === 403) {
        this.errorHandler.handle({
          status: 403,
          error: { message: 'Acesso negado. Verifique suas credenciais.' }
        });
      } else {
        this.errorHandler.handle(error);
      }

      return Promise.reject(error);
    });
  }

  public logout() {
    this.limparAccessToken();
  }

  public isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  public temPermissao(permissao: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);    
    localStorage.setItem('token', token);
    localStorage.setItem('id', this.jwtPayload.id);
    localStorage.setItem('nome', this.jwtPayload.nome);
    localStorage.setItem('status', this.jwtPayload.status);
    localStorage.setItem('cpf', this.jwtPayload.cpf);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  public limparAccessToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nome');
    localStorage.removeItem('status');
    localStorage.removeItem('cpf');
    this.jwtPayload = null;
  }

}