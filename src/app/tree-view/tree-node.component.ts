import { Component, Input } from '@angular/core';
import { TreeViewService } from './tree-view.service';
import { FlatTreeStruct, TreeNode } from './typings';

@Component({
  selector: 'tree-node',
  template: `
    <div class="tree-node"
        [class.node-expandable]="node.expandable"
        [class.expanded]="expanded">
      <div class="tree-node-handle" (click)="onClick()">
        <span class="node-name">{{node.name}}</span>
      </div>
      <div class="tree-node-nested" *ngIf="expanded">
        <tree-node *ngFor="let child of tree[node?.path]"
          [node]="child"
          [tree]="tree">
        </tree-node>
      </div>
    </div>
  `,
  styles: [`
    .tree-node {
      padding-left: 20pt;
    }

    .tree-node
    .tree-node-handle {
     cursor: default;
      padding: 2pt 0;
     transition: all 0.15s;
    }

    .tree-node.expanded {
     background-color: #ffc1070f; 
    }

    .tree-node.expanded >
    .tree-node-handle {
     font-weight: bold;
     font-size: 12.4pt;
    }

    .tree-node:not(.expanded):hover {
     background-color: #ffc10715;
    }

    .tree-node.node-type-dir:not(.expanded) >
    .tree-node-handle:hover {
     margin-left: -1.5px;
    }

    .tree-node
    .tree-node-handle::before {
      content: " ";
      display: inline-block;
      font-size: 7pt;
      margin-left: -15pt;
      vertical-align: middle;
      width: 15pt;
    }

    .tree-node.node-expandable >
    .tree-node-handle::before {
      content: "►";
    }

    .tree-node.node-expandable.expanded >
    .tree-node-handle::before {
      content: "▼";
    }
  `]
})
export class TreeNodeComponent {

  @Input()
  public node: TreeNode;

  @Input()
  public tree: FlatTreeStruct;

  public expanded = false;

  constructor(private treeViewService: TreeViewService) { }

  public onClick() {
    if (this.node.expandable) {
      this.expanded = !this.expanded;
      this.expanded && this.treeViewService.emitNodeExpand(this.node);
    }
  }

}
