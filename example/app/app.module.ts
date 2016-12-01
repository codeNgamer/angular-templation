import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TemplationModule } from 'angular-templation';

import { AppComponent,TestComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, TemplationModule],
  declarations: [AppComponent, TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
