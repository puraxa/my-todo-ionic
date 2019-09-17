import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  authHeaders = {
    'Content-type': 'application/json'
  };
  public apiLink = environment.API_LINK;
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }
  checkToken = async() => {
    try {
      const loader = await this.loadingController.create({
        message: 'Please wait...'
      });
      await loader.present();
      this.authHeaders['Authorization'] = localStorage.getItem('token');
      await this.http.get(
          this.apiLink+'/checkjwt',
        {
          headers: this.authHeaders
        }
      ).toPromise();
      this.isLoggedIn = true;
      this.router.navigate(['todo']);
      await loader.dismiss();
    } catch (err) {
      this.isLoggedIn = false;
      await this.loadingController.dismiss();
    }
  }
  logout = async() => {
    try {
      const loader = await this.loadingController.create({
        message: 'Logging out'
      });
      await loader.present();
      await this.http.get(
          this.apiLink + '/logout',
        {
          headers: this.authHeaders
        }
      ).toPromise();
      this.isLoggedIn = false;
      delete this.authHeaders['Authorization'];
      localStorage.clear();
      this.router.navigate(['login']);
      await loader.dismiss();
    } catch (err) {
      const alert = await this.alertController.create({
        message: err.message,
        buttons: [
          'OK'
        ]
      });
      await alert.present();
    }
  }
}
