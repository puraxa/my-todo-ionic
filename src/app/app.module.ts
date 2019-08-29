import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CreateTodoPage } from './create-todo/create-todo.page';
import { CreateTodoPageModule } from './create-todo/create-todo.module';
import { AddItemPage } from './add-item/add-item.page';
import { AddItemPageModule } from './add-item/add-item.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    CreateTodoPage,
    AddItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CreateTodoPageModule,
    AddItemPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
