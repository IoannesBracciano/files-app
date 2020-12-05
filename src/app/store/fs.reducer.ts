import { Action, createReducer, on } from '@ngrx/store';
import * as FsApiActions from './fs-api.actions';
import { TreeNode } from '../tree-view/typings';

export interface FsState {
  root: TreeNode;
  nodes: {
    [path: string]: TreeNode[];
  }
}

export const INITIAL_FS_STATE: FsState = {
  root: {
    name: '/',
    path: '/',
    expandable: true
  },
  nodes: {}
}

const fsReducer = createReducer(
  INITIAL_FS_STATE,
  on(FsApiActions.DIRECTORY_CONTENTS, (state, { path, nodes }) =>
    ({ ...state, nodes: {
        ...state.nodes,
        [path]: nodes.map(node => ({
          name: node.name,
          path: node.uri,
          expandable: node.type === 'dir'
        }))
    }})
  )
);

export function reducer(state: FsState | undefined, action: Action) {
  return fsReducer(state, action);
}
