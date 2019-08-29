import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ModalController } from '@ionic/angular';
import { CreateTodoPage } from '../create-todo/create-todo.page';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ErrorHandlingService } from '../error-handling.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private errorHandler: ErrorHandlingService
  ) { }
  items;
  loadShow;
  ngOnInit() {
    this.showLoader();
    this.http.get('https://todo-list-pura.herokuapp.com/gettodos', {
      headers: this.auth.authHeaders,
    }).subscribe(response => this.items = response);
  }
  showLoader = async() => {
    const loader = await this.loadingController.create(
      {
        message: 'Loading...'
      }
    );
    await loader.present();
    setInterval(async() => {
      if(this.items){
        await loader.dismiss();
        clearInterval();
      }
    },200);
  }
  deleteTodo = async(item) => {
    try {
      const alert = await this.alertController.create({
        message: 'Are you sure you want to delete this list and all items attached to id?',
        buttons: [
          {
            text: 'No'
          },
          {
            text: 'Yes',
            handler: async() => {
              const loader = await this.loadingController.create(
                {
                  message: 'Deleting todo list....'
                }
              );
              await loader.present();
              await this.http.post('https://todo-list-pura.herokuapp.com/deletetodo',
                {
                  todoid: item._id
                },
                {
                  headers: this.auth.authHeaders
                }
              ).toPromise();
              this.items = await this.http.get('https://todo-list-pura.herokuapp.com/gettodos', {
                headers: this.auth.authHeaders
              }).toPromise();
              await loader.dismiss();
            }
          }
        ]
      });
      await alert.present();
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  } 
  showModal = async() => {
    try {
      const modal = await this.modalController.create({
        component: CreateTodoPage
      });
      await modal.present();
      await modal.onDidDismiss();
      this.items = await this.http.get('https://todo-list-pura.herokuapp.com/gettodos', {
        headers: this.auth.authHeaders
      }).toPromise();
      if(await this.loadingController.getTop()){
        await this.loadingController.dismiss();
      }
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
}
