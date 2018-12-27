import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InputContainerComponent } from './input-container/input-container.component';
import { NgModule } from '@angular/core';
import { NgxMaskIonicModule } from 'ngx-mask-ionic-lib';



@NgModule({
  declarations: [AppComponent, InputContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskIonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
