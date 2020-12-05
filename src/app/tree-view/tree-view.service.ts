import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeNode } from './typings';

@Injectable()
export class TreeViewService {

    private expandSubject = new Subject<TreeNode>();

    public readonly expand$ = this.expandSubject.asObservable();

    public emitNodeExpand(node: TreeNode) {
        this.expandSubject.next(node);
    }

}
