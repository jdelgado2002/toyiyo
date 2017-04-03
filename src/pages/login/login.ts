import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { GoogleLoginService } from '../google-login/google-login.service';

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;


  constructor(
    public nav: NavController,
    public facebookLoginService: FacebookLoginService,
    public googleLoginService: GoogleLoginService,
    public loadingCtrl: LoadingController,
    public authService: AuthService
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSuccessfulLogin(res) {
    let env = this;
    console.log(res);
    env.loading.dismiss();
    //env.nav.setRoot(env.main_page.component); -- this is not needed since the app.component is checking for user changes and setting the default page when logged in
  }

  onFailedLogin(error) {
    let env = this;
    console.log(error);
    env.loading.dismiss();
    alert(error);
  }

  doLogin() {
    let env = this;
    env.loading = this.loadingCtrl.create();
    env.authService.loginUser(env.login.value.email, env.login.value.password)
      .then(authData => env.onSuccessfulLogin(authData))
      .catch(error => env.onFailedLogin(error));

    this.nav.setRoot(this.main_page.component);
  }

  doFacebookLogin() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    let env = this;

    this.facebookLoginService.getFacebookUser()
      .then(res => env.onSuccessfulLogin(res))
      .catch(error => {
        //we don't have the user data so we will ask him to log in
        env.facebookLoginService.doFacebookLogin()
          .then(res => env.onSuccessfulLogin(res))
          .catch(err => env.onFailedLogin(err));
      });
  }

  doGoogleLogin() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    let env = this;

    this.googleLoginService.trySilentLogin()
      .then(function (data) {
        // user is previously logged with Google and we have his data we will let him access the app
        env.nav.setRoot(env.main_page.component);
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.googleLoginService.doGoogleLogin()
          .then(function (res) {
            env.loading.dismiss();
            env.nav.setRoot(env.main_page.component);
          }, function (err) {
            console.log("Google Login error", err);
          });
      });
  }


  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }

}
