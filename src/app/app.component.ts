import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FsActions from './store/fs.actions';
import { FsState } from './store/fs.reducer';

@Component({
  selector: 'files-root',
  template: `
    <files-tree-view [path]="root">
    </files-tree-view>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  public root = '/';

  constructor(private store: Store<{ fs: FsState }>) { }

  ngOnInit() {
    this.store.dispatch(FsActions.LIST_DIRECTORY_CONTENTS({ path: this.root }));
  }

}
