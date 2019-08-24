import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { FsEffects } from './store/fs.effects';
import * as Fs from './store/fs.reducer';
import { TreeNodeComponent } from './tree-view/tree-node.component';
import { TreeViewComponent } from './tree-view/tree-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeNodeComponent,
    TreeViewComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([FsEffects]),
    HttpClientModule,
    StoreModule.forRoot({ fs: Fs.reducer }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
