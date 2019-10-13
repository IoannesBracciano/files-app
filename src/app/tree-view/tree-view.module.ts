import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeViewComponent } from './tree-view.component';
import { TreeNodeComponent } from './tree-node.component';
import { TreeViewService } from './tree-view.service';

@NgModule({
    declarations: [
        TreeNodeComponent,
        TreeViewComponent
    ],
    exports: [
        TreeViewComponent
    ],
    imports: [
        BrowserModule,
    ],
    providers: [
        TreeViewService
    ]
})
export class TreeViewModule { }
