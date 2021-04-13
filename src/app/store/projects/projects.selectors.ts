import { createFeatureSelector, createSelector } from '@ngrx/store';
import { projectsFeatureKey, ProjectState } from './projects.reducer';

const projectFeatureSelector = createFeatureSelector<ProjectState>(projectsFeatureKey);

const projects = createSelector(
  projectFeatureSelector,
  (state: ProjectState) => state.projects
)

const projectSelected = createSelector(
  projectFeatureSelector,
  (state: ProjectState) => state.projectSelected
)

const error = createSelector(
  projectFeatureSelector,
  (state: ProjectState) => state.error
)

export const ProjectsQuery = {
  projects,
  projectSelected,
  error
}
