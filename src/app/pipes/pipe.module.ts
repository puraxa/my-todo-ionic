import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { AddPropertyPipe } from './add-property.pipe';
import { SortPipe } from './sort.pipe';

@NgModule({
  imports: [],
  declarations: [FilterPipe, AddPropertyPipe, SortPipe,  ],
  exports: [FilterPipe, AddPropertyPipe, SortPipe ]
})
export class PipesModule {}