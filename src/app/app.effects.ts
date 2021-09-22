import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadPeoplesRequested, ActionTypes, LoadPeoples, AppState, getAllPeoplesLoaded} from './app.store';
import { withLatestFrom, exhaustMap, filter, map, mergeMap } from 'rxjs/operators';
import { DataService } from './services/data.service';

@Injectable()
export class AppEffects {
//   loadPeoplesRequested$ = createEffect(() => {
//     return this.actions$.pipe(
//         ofType<LoadPeoplesRequested>(ActionTypes.LoadPeoplesRequested),
//         withLatestFrom(this.store.select(getAllPeoplesLoaded)),
//         filter(([_, loaded]) => !loaded),
//         exhaustMap(() => this.dataService.fetchPeopleList().pipe(
//           map(result => new LoadPeoples(result))
//         ))
//     );
//   });

    loadPeoplesRequested$ = createEffect(() => {
      return this.actions$.pipe(
        ofType<LoadPeoplesRequested>(ActionTypes.LoadPeoplesRequested),
    mergeMap(() => this.dataService.fetchPeopleList().pipe(
        map((result: any) => {
            return new LoadPeoples(result)
        }))))
    });


  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private dataService: DataService
  ) {}
}

