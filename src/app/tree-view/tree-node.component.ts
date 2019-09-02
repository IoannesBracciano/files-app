import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Node } from '../models/node';
import * as FsActions from '../store/fs.actions';
import { FsState } from '../store/fs.reducer';

@Component({
  selector: 'files-tree-node',
  template: `
    <div class="tree-node"
        [class.node-type-dir]="node.type==='dir'"
        [class.node-type-file]="node.type==='file'"
        [class.node-type-symlink]="node.type==='symlink'"
        [class.expanded]="expanded">
      <div class="tree-node-handle" (click)="onClick()">
        <span class="node-name">{{node.name}}</span>
      </div>
      <files-tree-view *ngIf="node && expanded" [path]="node.uri">
      </files-tree-view>
    </div>
  `,
  styles: [`
    .tree-node {
      padding-left: 20pt;
    }

    .tree-node
    .tree-node-handle {
    //  cursor: default;
      padding: 2pt 0;
    //  transition: all 0.15s;
    }

    //.tree-node.expanded {
    //  background-color: #ffc1070f; 
    //}

    //.tree-node.expanded >
    //.tree-node-handle {
    //  font-weight: bold;
    //  font-size: 12.4pt;
    //}

    //.tree-node:not(.expanded):hover {
    //  background-color: #ffc10715;
    //}

    //.tree-node.node-type-dir:not(.expanded) >
    //.tree-node-handle:hover {
    //  margin-left: -1.5px;
    //}

    .tree-node
    .tree-node-handle::before {
      content: " ";
      display: inline-block;
      font-size: 7pt;
      margin-left: -15pt;
      vertical-align: middle;
      width: 15pt;
    }

    .tree-node.node-type-dir >
    .tree-node-handle::before {
      content: "►";
    }

    .tree-node.node-type-dir.expanded >
    .tree-node-handle::before {
      content: "▼";
    }
  `]
})
export class TreeNodeComponent implements OnInit {

  @Input()
  public node: Node;

  public expanded = false;

  constructor(private store: Store<{ fs: FsState }>) { }

  ngOnInit() {
  }

  public onClick() {
    if (this.node.type === 'dir') {
      this.expanded = !this.expanded;
      this.store.dispatch(FsActions.LIST_DIRECTORY_CONTENTS({ path: this.node.uri }));
    }
  }

}
