import { createReducer, on } from '@ngrx/store';
import { projectModel } from 'src/app/common/models/project.model';
import * as actions from './projects.actions';
export const projectsFeatureKey = 'projects';

export interface ProjectState {
  projects: projectModel[],
  projectSelected: projectModel,
  loading: boolean,
  error: any
}

export const projectsInitialState: ProjectState = {
  projects: null,
  projectSelected: null,
  loading: false,
  error: null
}

const reducer = createReducer(
  projectsInitialState,
  on(actions.loadProjects, (state) => ({
    ...state,
    loading: true
  })),
  on(actions.loadProjectsSuccess, (state, { data }) => ({
    ...state,
    projects: data,
    loading: false,
    error: null
  })),
  on(actions.loadProjectsError, (state, { error }) => ({
    ...state,
    projects: null,
    loading: false,
    error: { ...error }
  })),
  on(actions.selectProject, (state, { data }) => ({
    ...state,
    selectProject: { ...data }
  })),
);


export function projectReducer(state, action) {
  return reducer(state, action);
}
