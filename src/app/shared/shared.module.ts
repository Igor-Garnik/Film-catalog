import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutDescriptionPipe } from './pipes/cut-description.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { TransformPathPipe } from './pipes/transform-path.pipe';
import { CutRatingPipe } from './pipes/cut-rating.pipe';


@NgModule({
    declarations: [
        CutDescriptionPipe,
        SearchPipe,
        TransformPathPipe,
        CutRatingPipe],
    imports: [
        CommonModule,
    ],
    exports: [
        CutDescriptionPipe,
        SearchPipe,
        CutRatingPipe,
        TransformPathPipe
    ]
})
export class SharedModule { }