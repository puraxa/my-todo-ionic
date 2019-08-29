import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoPage } from './todo.page';
import { PipesModule } from '../pipes/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: TodoPage
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
  declarations: [TodoPage]
})
export class TodoPageModule {}
