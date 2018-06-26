import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutDescriptionPipe } from './pipes/cut-description.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { CheckImgPipe } from './pipes/check-img.pipe';
import { CutRatingPipe } from './pipes/cut-rating.pipe';


@NgModule({
    declarations: [
        CutDescriptionPipe,
        SearchPipe,
        CheckImgPipe,
        CutRatingPipe],
    imports: [
        CommonModule,
    ],
    exports: [
        CutDescriptionPipe,
        SearchPipe,
        CutRatingPipe
    ]
})
export class SharedModule { }