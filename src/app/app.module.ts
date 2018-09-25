import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmCatalogModule } from './film-catalog/film-catalog.module';
import { SharedModule } from './shared/shared.module';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import lcoaleRuUA from '@angular/common/locales/ru-UA';
import { apiConfig, API_CONFIG } from './shared/configs/api.config';
import { SearchComponent } from './/film-catalog/search/search.component'
import { MaterialModule } from './material.module';
import { ModalComponent } from './modal/modal.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { PaginatorComponent } from './paginator/paginator.component';
import { FooterComponent } from './footer/footer.component';

registerLocaleData(lcoaleRuUA);

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ModalComponent,
    PaginatorComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FilmCatalogModule,
    SharedModule,
    MaterialModule,
    Ng2CarouselamosModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-UA" },
    { provide: API_CONFIG, useValue: apiConfig }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }

