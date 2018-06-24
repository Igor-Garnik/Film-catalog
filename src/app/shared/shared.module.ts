import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutDescriptionPipe } from './cut-description.pipe';
import { SearchPipe } from './search.pipe';


@NgModule({
    declarations: [
        CutDescriptionPipe,
        SearchPipe],
    imports: [
        CommonModule,
    ],
    exports: [
        CutDescriptionPipe,
        SearchPipe
    ]
})
export class SharedModule { }