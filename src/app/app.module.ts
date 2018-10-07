import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import lcoaleRuUA from '@angular/common/locales/ru-UA';
import { apiConfig, API_CONFIG } from './shared/configs/api.config';
import { MaterialModule } from './material.module';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { CatalogsModule } from './catalogs/catalogs.module';

registerLocaleData(lcoaleRuUA);

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CatalogsModule,
    SharedModule,
    MaterialModule,
    Ng2CarouselamosModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-UA" },
    { provide: API_CONFIG, useValue: apiConfig }
  ],
  bootstrap: [AppComponent]
  //entryComponents: [ModalComponent]
})
export class AppModule { }

