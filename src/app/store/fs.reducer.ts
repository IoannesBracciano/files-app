import { Action, createReducer, on } from '@ngrx/store';
import { Node } from '../models/node';
import * as FsApiActions from './fs-api.actions';

export interface FsState {
  nodes: Node[];
}

export const INITIAL_FS_STATE: FsState = {
  nodes: []
}

const fsReducer = createReducer(
  INITIAL_FS_STATE,
  on(FsApiActions.DIRECTORY_CONTENTS, (state, { path, nodes }) => ({ nodes }))
);

export function reducer(state: FsState | undefined, action: Action) {
  return fsReducer(state, action);
}
