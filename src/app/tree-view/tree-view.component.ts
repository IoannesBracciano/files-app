import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Node } from '../models/node';

@Component({
  selector: 'files-tree-view',
  template: `
    <files-tree-node
      [node]="root"
      [tree]="tree"
      (expand)="nodeExpand.emit($event)">
    </files-tree-node>
  `,
  styles: []
})
export class TreeViewComponent {

  @Input()
  public root: Node;

  @Input()
  public tree: { [path: string]: Node[] };

  @Output()
  public nodeExpand = new EventEmitter<Node>();

}
