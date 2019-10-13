import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Node } from '../models/node';
import { TreeViewService } from './tree-view.service';

@Component({
  selector: 'files-tree-view',
  template: `
    <files-tree-node
      [node]="root"
      [tree]="tree">
    </files-tree-node>
  `,
  styles: []
})
export class TreeViewComponent implements OnDestroy, OnInit {

  @Input()
  public root: Node;

  @Input()
  public tree: { [path: string]: Node[] };

  @Output()
  public nodeExpand = new EventEmitter<Node>();

  private expandSubscription: Subscription;

  constructor(private treeViewService: TreeViewService) { }

  ngOnDestroy() {
    this.expandSubscription.unsubscribe();
  }

  ngOnInit() {
    this.expandSubscription = this.treeViewService.expand$.subscribe(
      node => this.nodeExpand.emit(node)
    );
  }

}
