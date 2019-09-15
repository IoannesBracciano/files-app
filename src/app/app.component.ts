import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Node } from './models/node';
import { LIST_DIRECTORY_CONTENTS } from './store/fs.actions';
import { FsState } from './store/fs.reducer';
import { selectAllNodes, selectRoot } from './store/fs.selectors';

@Component({
  selector: 'files-root',
  template: `
    <files-tree-view
      [root]="root$ | async"
      [tree]="nodes$ | async"
      (nodeExpand)="onNodeExpand($event)">
    </files-tree-view>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  public nodes$: Observable<{ [path: string]: Node[] }>;

  public root$: Observable<Node>;

  constructor(private store: Store<{ fs: FsState }>) { }

  ngOnInit() {
    this.nodes$ = this.store.pipe(select(selectAllNodes));
    this.root$ = this.store.pipe(select(selectRoot));
  }

  public onNodeExpand(node: Node) {
    this.store.dispatch(LIST_DIRECTORY_CONTENTS({ path: node.uri }));
  }

}
