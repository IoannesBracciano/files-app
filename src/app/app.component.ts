import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LIST_DIRECTORY_CONTENTS } from './store/fs.actions';
import { FsState } from './store/fs.reducer';
import { selectAllNodes, selectRoot } from './store/fs.selectors';
import { TreeNode } from './tree-view/typings';

@Component({
  selector: 'files-root',
  template: `
    <tree-view
      [root]="root$ | async"
      [tree]="nodes$ | async"
      (nodeExpand)="onNodeExpand($event)">
    </tree-view>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  public nodes$: Observable<{ [path: string]: TreeNode[] }>;

  public root$: Observable<TreeNode>;

  constructor(private store: Store<{ fs: FsState }>) { }

  ngOnInit() {
    this.nodes$ = this.store.pipe(select(selectAllNodes));
    this.root$ = this.store.pipe(select(selectRoot));
  }

  public onNodeExpand(node: TreeNode) {
    this.store.dispatch(LIST_DIRECTORY_CONTENTS({ path: node.path }));
  }

}
