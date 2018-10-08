import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { TransformDescriptionPipe } from './pipes/transform-description.pipe';
import { TransformPathPipe } from './pipes/transform-path.pipe';
import { TransformRatingPipe } from './pipes/transform-rating.pipe';
import { NotFoundComponent } from './not-found/not-found.component'
import { MainComponent } from './main/main.component';
import { ModalComponent } from './modal/modal.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchComponent } from './search/search.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewQueryComponent } from './view-query/view-query.component';


@NgModule({
    declarations: [
        TransformDescriptionPipe,
        TransformPathPipe,
        TransformRatingPipe,
        NotFoundComponent,
        MainComponent,
        FooterComponent,
        LoginComponent,
        PaginatorComponent,
        SearchComponent,
        SpinnerComponent,
        ViewQueryComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        MaterialModule
    ],
    exports: [
        TransformDescriptionPipe,
        TransformRatingPipe,
        TransformPathPipe,
        PaginatorComponent,
        SearchComponent,
        NotFoundComponent,
        FooterComponent,
        LoginComponent,
        PaginatorComponent, SpinnerComponent,
        ModalComponent
    ],
    entryComponents: [ModalComponent]
})
export class SharedModule { }