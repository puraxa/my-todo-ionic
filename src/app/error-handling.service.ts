import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor( 
    private alertController: AlertController,
    private loadingController: LoadingController
   ) { }

  errorHandle = async(error) => {
    const errorMessage = error.error.message ? error.error.message : error.message;
    const alert = await this.alertController.create({
      message: errorMessage,
      buttons: [
        'Ok'
      ]
    });
    await this.loadingController.dismiss();
    await alert.present();
  }
}
