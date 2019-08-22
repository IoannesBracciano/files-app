import { Component } from '@angular/core';

@Component({
  selector: 'files-root',
  template: `
    <files-tree-view [nodes]="nodes">
    </files-tree-view>
  `,
  styles: []
})
export class AppComponent {
  title = 'files-app';
  nodes = [
    {
      name: 'node 1',
      type: 'dir'
    },
    {
      name: 'node 2',
      type: 'file'
    },
    {
      name: 'node 3',
      type: 'symlink'
    }
  ];
}
