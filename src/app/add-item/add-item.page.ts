import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ErrorHandlingService } from '../error-handling.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  constructor(
    private auth: AuthService,
    private modalController: ModalController,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private errorHandler: ErrorHandlingService
  ) { }
  newItemValue:string;
  id:string;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(response => {
      this.id = response.id
    });
  }
  dismissModal = async() => {
    await this.modalController.dismiss();
  }
  addItem = async() => {
    try {
      const loader = await this.loadingController.create({
        message: 'Adding item...'
      });
      await loader.present();
      await this.http.post(
        'https://todo-list-pura.herokuapp.com/additem',
        {
          todoid: this.id,
          value: this.newItemValue
        },
        {
          headers: this.auth.authHeaders
        }
      ).toPromise();
      await this.dismissModal();
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
}
