import { Action, createReducer, on } from '@ngrx/store';
import { Node } from '../models/node';
import * as FsApiActions from './fs-api.actions';

export interface FsState {
  root: Node;
  nodes: {
    [path: string]: Node[];
  }
}

export const INITIAL_FS_STATE: FsState = {
  root: {
    uri: '/',
    name: '/',
    type: 'dir'
  },
  nodes: {}
}

const fsReducer = createReducer(
  INITIAL_FS_STATE,
  on(FsApiActions.DIRECTORY_CONTENTS, (state, { path, nodes }) =>
    ({ ...state, nodes: { ...state.nodes, [path]: nodes } }))
);

export function reducer(state: FsState | undefined, action: Action) {
  return fsReducer(state, action);
}
