import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TemplationDirective } from './templation.directive';
import { TemplationComponent } from './templation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TemplationDirective,
    TemplationComponent
  ],
  exports: [TemplationDirective, TemplationComponent]
})
export class TemplationModule {}
