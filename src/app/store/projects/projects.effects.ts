import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actions from './projects.actions'
import { of } from 'rxjs';
import { FirestoreOperationsService } from 'src/app/services/firestore-operations.service';


@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private fcs:FirestoreOperationsService
  ) { }

  loadProjects$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.loadProjects),
      mergeMap(
        () => this.fcs.colWithIds$('projects').pipe(
          map((projects => actions.loadProjectsSuccess({ data: projects }))),
          catchError(error=>of(actions.loadProjectsError({error})))
        )
      )
    )
  )

}
