import { createAction, props } from "@ngrx/store";
import { projectModel } from "src/app/common/models/project.model";

export const loadProjects = createAction(
  '[Projects] Load Projects'
)

export const loadProjectsSuccess = createAction(
  '[Projects] Load Projects Success',
  props<{data: projectModel[]}>()
)

export const loadProjectsError = createAction(
  '[Projects] Load Projects Error',
  props<{error: any}>()
)

export const selectProject = createAction(
  '[Projects] Select Project',
  props<{data: projectModel}>()
)
