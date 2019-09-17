import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AddItemPage } from '../add-item/add-item.page';
import { async } from '@angular/core/testing';
import { ErrorHandlingService } from '../error-handling.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-showtodo',
  templateUrl: './showtodo.page.html',
  styleUrls: ['./showtodo.page.scss'],
})
export class ShowtodoPage implements OnInit {

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private actionController: ActionSheetController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private errorHandler: ErrorHandlingService
  ) { }
  public apiLink = environment.API_LINK;
  id;
  items;
  ngOnInit() {
    this.showLoader();
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id
    });
    this.http.post(this.apiLink + '/gettodo', {
      todoid: this.id,
    },
    {
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
  showActionSheet = async(item) => {
    try {
      const actionSheet = await this.actionController.create({
        header: 'Actions',
        buttons: [
          {
            text: 'Delete',
            icon: 'trash',
            handler: () => {
              this.deleteItem(item._id);
            }
          },
          {
            text: 'Edit',
            icon: 'create',
            handler: () => {
              item.edit = !item.edit;
            }
          },
          {
            text: item.isCompleted ? 'Mark item as not completed' : 'Mark item as completed',
            icon: 'done-all',
            handler: () => {
              this.completeItem(item._id);
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
          }
        ],
        
      });
      await actionSheet.present();
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
  deleteItem = async(id) => {
    try {
      const deleteAlert = await this.alertController.create({
        header: 'Delete confirmation',
        message: 'Are you sure you want to delete item',
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            handler: async() => {
              try {
                const loader = await this.loadingController.create({
                  message: 'Deleting item....',
                  animated: true
                });
                await loader.present();
                await this.http.post(this.apiLink + '/deleteitem', {
                  itemid: id,
                  todoid: this.items._id
                },{
                  headers: this.auth.authHeaders
                }).toPromise();
                this.items = await this.http.post(this.apiLink + '/gettodo', {
                  todoid: this.id,
                },
                {
                  headers: this.auth.authHeaders,
                }).toPromise();
                await loader.dismiss();
              } catch (err) {
                const alert = await this.alertController.create({
                  header: 'Error',
                  message: 'There was an error, please try again',
                  buttons: [
                    'OK'
                  ]
                });
                await this.loadingController.dismiss();
                await alert.present();
              }
            }
          }
        ]
      });
      await deleteAlert.present();
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
  showModal = async() => {
    try {
      const modal = await this.modalController.create({
        component: AddItemPage
      });
      await modal.present();
      await modal.onDidDismiss();
      this.items = await this.http.post(
        this.apiLink + '/gettodo',
        {
          todoid: this.id
        },
        {
          headers: this.auth.authHeaders
        }
      ).toPromise();
      if(await this.loadingController.getTop()){
        await this.loadingController.dismiss();
      }
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
  completeItem = async(id) => {
    try {
      const loader = await this.loadingController.create({});
      await loader.present();
      await this.http.post(
        this.apiLink + '/completeitem',
        {
          todoid: this.id,
          itemid: id
        },
        {
          headers: this.auth.authHeaders
        }
      ).toPromise();
      this.items = await this.http.post(
        this.apiLink + '/gettodo',
        {
          todoid: this.id
        },
        {
          headers: this.auth.authHeaders
        }
      ).toPromise();
      await loader.dismiss();
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
  closeEdit = async(item,index) => {
    try {
      const loader = await this.loadingController.create({
        message: 'Please wait...'
      });
      await loader.present();
      const response = await this.http.post(
        this.apiLink + '/gettodo',
        {
          todoid: this.id
        },
        {
          headers: this.auth.authHeaders
        }
      ).toPromise();
      if(response['items'][index].value != item.value){
        const alert = await this.alertController.create({
          message: 'You have unsaved changed. Do you want to save them before closing?',
          buttons : [
            {
              text: 'No',
              handler: async() => {
                this.items = await this.http.post(
                  this.apiLink + '/gettodo',
                  {
                    todoid: this.id
                  },
                  {
                    headers: this.auth.authHeaders
                  }
                ).toPromise();
              }
            },
            {
              text: 'Yes',
              handler: async() => {
                await this.editItem(item);
              }
            }
          ]
        });
        await loader.dismiss();
        await alert.present();
        return;
      }
      await loader.dismiss();
      item.edit = !item.edit;
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
  editItem = async(item) => {
    try {
      const loader = await this.loadingController.create({
        message: 'Updating item....'
      });
      await loader.present();
      await this.http.post(
        this.apiLink + '/edititem',
        {
          todoid: this.id,
          itemid: item._id,
          value: item.value
        },
        {
          headers: this.auth.authHeaders
        }
      ).toPromise();
      this.items = await this.http.post(
        this.apiLink + '/gettodo',
        {
          todoid: this.id
        },
        {
          headers: this.auth.authHeaders
        }
      ).toPromise();
      await loader.dismiss();
    } catch (err) {
      await this.errorHandler.errorHandle(err);
    }
  }
}
