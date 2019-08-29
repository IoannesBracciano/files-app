import { createSelector } from '@ngrx/store';
import { FsState } from './fs.reducer';

export const selectFs = (state: { fs: FsState }) => state.fs;

export const selectAllNodes = createSelector(
  selectFs,
  (fsState) => fsState.nodes
);

export const selectPath = createSelector(
  selectFs,
  (fsState, { path }) => fsState.nodes[path]
)
