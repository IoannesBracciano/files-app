import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Node } from './models/node';
import * as FsActions from './store/fs.actions';
import { FsState } from './store/fs.reducer';
import { selectAllNodes } from './store/fs.selectors';

@Component({
  selector: 'files-root',
  template: `
    <files-tree-view [nodes]="nodes$ | async">
    </files-tree-view>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'files-app';

  public nodes$: Observable<Node[]>;

  constructor(private store: Store<{ fs: FsState }>) { }

  ngOnInit() {
    this.nodes$ = this.store.pipe(select(selectAllNodes));
    this.store.dispatch(FsActions.LIST_DIRECTORY_CONTENTS({ path: '/' }));
  }

}
