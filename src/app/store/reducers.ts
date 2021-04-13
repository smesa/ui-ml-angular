import { ActionReducerMap } from '@ngrx/store';
import { projectReducer, ProjectState } from './projects/projects.reducer';

export interface AppState {
  projects: ProjectState
}

export const appReducers: ActionReducerMap<AppState> = {
  projects: projectReducer
}
