import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { ErrorHandlingService } from '../error-handling.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  newTodoName: string;
  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    private auth: AuthService,
    private loadingController: LoadingController,
    private errorHandler: ErrorHandlingService
  ) { }

  ngOnInit() {
  }
  dismissModal = async() => {
    await this.modalController.dismiss();
  }
  createTodo = async() => {
    try {
      const loader = await this.loadingController.create({
        message: 'Creating new todo list...'
      });
      await loader.present();
      await this.http.post(
        'https://todo-list-pura.herokuapp.com/createtodo',
        {
          name: this.newTodoName,
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
