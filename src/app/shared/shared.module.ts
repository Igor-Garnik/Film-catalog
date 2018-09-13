import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformDescriptionPipe } from './pipes/transform-description.pipe';
import { TransformPathPipe } from './pipes/transform-path.pipe';
import { TransformRatingPipe } from './pipes/transform-rating.pipe';


@NgModule({
    declarations: [
        TransformDescriptionPipe,
        TransformPathPipe,
        TransformRatingPipe],
    imports: [
        CommonModule,
    ],
    exports: [
        TransformDescriptionPipe,
        TransformRatingPipe,
        TransformPathPipe
    ]
})
export class SharedModule { }