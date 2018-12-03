import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { FormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask-ionic-lib';

@NgModule({
  declarations: [AppComponent, InputContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
