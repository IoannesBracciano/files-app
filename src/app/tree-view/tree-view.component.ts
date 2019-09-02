import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Node } from '../models/node';
import { FsState } from '../store/fs.reducer';
import { selectPath } from '../store/fs.selectors';

@Component({
  selector: 'files-tree-view',
  template: `
    <files-tree-node *ngFor="let node of nodes$ | async" [node]="node">
    </files-tree-node>
  `,
  styles: []
})
export class TreeViewComponent implements OnInit {

  @Input()
  public path: string;

  public nodes$: Observable<Node[]>;

  constructor(private store: Store<{ fs: FsState }>) { }

  ngOnInit() {
    this.nodes$ = this.store.pipe(select(selectPath, { path: this.path }));
  }

}
