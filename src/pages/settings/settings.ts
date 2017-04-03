import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

import { LoginPage } from '../login/login';

import 'rxjs/Rx';

import { ProfileModel } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settingsForm: FormGroup;
  // make WalkthroughPage the root (or first) page
  rootPage: any = LoginPage;
  loading: any;
  profile: ProfileModel = new ProfileModel();

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileService,
    public AuthService: AuthService
  ) {
    this.loading = this.loadingCtrl.create();

    this.settingsForm = new FormGroup({
      name: new FormControl(),
      location: new FormControl(),
      description: new FormControl(),
      currency: new FormControl(),
      weather: new FormControl(),
      notifications: new FormControl()
    });
  }

  ionViewDidLoad() {
    this.loading.present();
    this.profileService
      .getData()
      .then(data => {
        this.profile.user = data.user;

        this.settingsForm.setValue({
          name: data.user.name,
          location: data.user.location,
          description: data.user.about,
          currency: 'dollar',
          weather: 'fahrenheit',
          notifications: true
        });

        this.loading.dismiss();
      });
  }

  onSuccessfulLogout(response) {
    let env = this;
    env.loading.dismiss();
    env.nav.setRoot(this.rootPage);

  }

  onFailedLogout(error) {
    let env = this;
    env.loading.dismiss();
    alert(error);
  }

  logout() {
    // navigate to the new page if it is not the current page
    let env = this;
    env.AuthService.logoutUser()
      .then(authData => env.onSuccessfulLogout(authData))
      .catch(error => env.onFailedLogout(error));
    this.nav.setRoot(this.rootPage);
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }
}
