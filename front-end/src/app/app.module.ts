import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/angular-material.module';
import { CityCardComponent } from './components/city-card/city-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TempPipePipe } from './shared/pipes/temp-pipe.pipe';
import { MyInterceptor } from './services/interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CityCardComponent,
    TempPipePipe
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
