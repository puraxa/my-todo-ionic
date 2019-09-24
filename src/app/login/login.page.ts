import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ErrorHandlingService } from '../error-handling.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private errorHandler: ErrorHandlingService
  ) {}
  public apiLink = environment.API_LINK;
  login = async(formData) => {
    try {
      const loader = await this.loadingController.create({
        message: 'Logging in'
      });
      await loader.present();
      const data = formData.form.value;
      const response = await this.http.post(
        this.apiLink + '/user/login',
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-type': 'application/json'
          }
        }
      ).toPromise();
      this.auth.isLoggedIn = true;
      this.auth.authHeaders['Authorization'] = response['token'];
      window.localStorage.setItem('token', response['token']);
      await loader.dismiss();
      this.router.navigate(['todo']);
    } catch (err) {
      this.errorHandler.errorHandle(err);
    }
  }
}
