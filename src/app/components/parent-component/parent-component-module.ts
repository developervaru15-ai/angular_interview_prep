import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentComponentRoutingModule } from './parent-component-routing-module';
import { ParentComponent } from './parent-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildComponent } from '../child-component/child-component';

@NgModule({
  declarations: [
    ParentComponent,
  ],
  imports: [
    CommonModule, 
    ParentComponentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChildComponent
  ],
})
export class ParentComponentModule {}
