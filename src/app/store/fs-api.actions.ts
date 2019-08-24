import { createAction, props } from '@ngrx/store';
import { Node } from '../models/node';

export const DIRECTORY_CONTENTS = createAction(
  '[File System API] Directory Contents',
  props<{ path: string, nodes: Node[] }>()
);