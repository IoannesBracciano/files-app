import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Node } from '../models/node';

@Injectable()
export class TreeViewService {

    private expandSubject = new Subject<Node>();

    public readonly expand$ = this.expandSubject.asObservable();

    public emitNodeExpand(node: Node) {
        this.expandSubject.next(node);
    }

}
