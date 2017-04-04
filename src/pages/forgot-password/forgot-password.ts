import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  main_page: { component: any };

  constructor(public nav: NavController,
    public authService: AuthService) {
    this.main_page = { component: TabsNavigationPage };

    this.forgot_password = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  onSuccessRecoverPassword(res) {
    //todo: Use native toast when cordoba present, else use alert
    alert("password reset email sent");
    this.nav.setRoot(this.main_page.component);
  }

  onFailedRecoverPassword(error) {
    //todo: Use native toast when cordoba present, else use alert
    alert(error);
  }

  recoverPassword() {
    let env = this;
    env.authService.resetPassword(env.forgot_password.value.email)
      .then(res => env.onSuccessRecoverPassword(res))
      .catch(err => env.onFailedRecoverPassword(err));
  }

}
