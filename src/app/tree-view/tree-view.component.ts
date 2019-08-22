import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../models/node';

@Component({
  selector: 'files-tree-view',
  template: `
    <files-tree-node *ngFor="let node of nodes" [node]="node">
    </files-tree-node>
  `,
  styles: []
})
export class TreeViewComponent implements OnInit {

  @Input()
  public nodes: Node[];

  constructor() { }

  ngOnInit() {
  }

}
