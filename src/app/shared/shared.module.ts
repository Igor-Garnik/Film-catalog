import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutDescriptionPipe } from './pipes/cut-description.pipe';
import { TransformPathPipe } from './pipes/transform-path.pipe';
import { CutRatingPipe } from './pipes/cut-rating.pipe';


@NgModule({
    declarations: [
        CutDescriptionPipe,
        TransformPathPipe,
        CutRatingPipe],
    imports: [
        CommonModule,
    ],
    exports: [
        CutDescriptionPipe,
        CutRatingPipe,
        TransformPathPipe
    ]
})
export class SharedModule { }