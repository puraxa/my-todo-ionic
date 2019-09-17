import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../error-handling.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage implements OnInit {
  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private router: Router,
    private errorHandler: ErrorHandlingService
  ) 
  {
  }
  public apiLink = environment.API_LINK;
  ngOnInit() {
  }
  register = async(formData) => {
    try {
      const loader = await this.loadingController.create(
        {
          message: 'Registering'
        }
      );
      await loader.present();
      const data = formData.form.value;
      if(!data.email || !data.password || !data.confirmPassword){
        throw {
          error : {message: "All fields are required"}
        }
      }
      if(data.password != data.confirmPassword){
        throw {
          error: {message: "Passwords don't match"}
        }
      }
      const response = await this.http.post(this.apiLink + '/register',
          {email: data.email, password: data.password},
          {
            headers: {
              'Content-type': 'application/json'
            }
          }
        ).toPromise();
      await loader.dismiss();
      this.router.navigate(['login']);
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
}
