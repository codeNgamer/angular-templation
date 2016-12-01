import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { TemplationDirective } from './templation.directive';
import { TemplationComponent } from './templation.component';

@NgModule({
  imports: [
    BrowserModule,
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
