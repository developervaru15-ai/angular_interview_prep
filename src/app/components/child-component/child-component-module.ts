import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildComponentRoutingModule } from './child-component-routing-module';
import { ChildComponent } from './child-component';

@NgModule({
  imports: [CommonModule, ChildComponentRoutingModule, ChildComponent],
})
export class ChildComponentModule {}
