import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipe.module';

import { IonicModule } from '@ionic/angular';

import { ShowtodoPage } from './showtodo.page';

const routes: Routes = [
  {
    path: '',
    component: ShowtodoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [ShowtodoPage]
})
export class ShowtodoPageModule {}
