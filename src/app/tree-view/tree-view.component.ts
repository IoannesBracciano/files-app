import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Node } from '../models/node';
import { FsState } from '../store/fs.reducer';
import { selectRoot } from '../store/fs.selectors';

@Component({
  selector: 'files-tree-view',
  template: `
    <files-tree-node [node]="root$ | async">
    </files-tree-node>
  `,
  styles: []
})
export class TreeViewComponent implements OnInit {

  public root$: Observable<Node>;

  constructor(private store: Store<{ fs: FsState }>) { }

  ngOnInit() {
    this.root$ = this.store.pipe(select(selectRoot));
  }

}
