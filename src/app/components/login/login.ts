import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthorizationService } from '../../configuration/security/authorization.service';
import { LoadingService } from '../../configuration/core/loading.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  email: string = '';
  senha: string = '';

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private loadingService: LoadingService,
    public messageService: MessageService
  ) { }


  login(usuario: string, senha: string) {
    if(usuario == null || usuario.length == 0 || senha == null || senha.length == 0){
      this.messageService.add({severity:'warn', summary:'Aviso!', detail:'Informe o e-mail e a senha'});
    }else{
      this.loadingService.show();
      this.authorizationService.login(usuario, senha)
        .then(() => {
          this.router.navigate(['/']);
          this.loadingService.hide();
        })
        .catch(erro => {
          this.loadingService.hide();
        });
    }
    
  }

}