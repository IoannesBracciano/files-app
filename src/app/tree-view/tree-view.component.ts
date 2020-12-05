import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TreeViewService } from './tree-view.service';
import { FlatTreeStruct, TreeNode } from './typings';

@Component({
  selector: 'tree-view',
  template: `
    <tree-node
      [node]="root"
      [tree]="tree">
    </tree-node>
  `,
  styles: []
})
export class TreeViewComponent implements OnDestroy, OnInit {

  @Input()
  public root: TreeNode;

  @Input()
  public tree: FlatTreeStruct;

  @Output()
  public nodeExpand = new EventEmitter<TreeNode>();

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
