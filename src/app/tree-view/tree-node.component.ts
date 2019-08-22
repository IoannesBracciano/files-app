import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../models/node';

@Component({
  selector: 'files-tree-node',
  template: `
    <div class="tree-node"
        [class.node-type-dir]="node.type==='dir'"
        [class.node-type-file]="node.type==='file'"
        [class.node-type-symlink]="node.type==='symlink'">
      <span class="node-name">{{node.name}}</span>
    </div>
  `,
  styles: [`
    .tree-node {
      padding: 2pt 0;
    }

    .tree-node::before {
      display: inline-block;
      font-size: 10pt;
      width: 15pt;
      vertical-align: middle;
      content: " ";
    }

    .tree-node.node-type-dir::before {
      content: "►";
    }
  `]
})
export class TreeNodeComponent implements OnInit {

  @Input()
  public node: Node;

  constructor() { }

  ngOnInit() {
  }

}
