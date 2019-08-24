import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { FsApiService } from '../fs-api.service';
import { Node } from '../models/node';
import * as FsActions from './fs.actions';
import * as FsApiActions from './fs-api.actions';

@Injectable()
export class FsEffects {

  listDirectoryContents$ = createEffect(() => this.actions$.pipe(
    ofType(FsActions.LIST_DIRECTORY_CONTENTS),
    mergeMap(({ path }) => this.fs.ls(path).pipe(
      map((res:any) => res.nodes as Node[]),
      map(nodes => FsApiActions.DIRECTORY_CONTENTS({ path, nodes }))
    ))
  ));

  constructor(
    private actions$: Actions,
    private fs: FsApiService
  ) { }

}
