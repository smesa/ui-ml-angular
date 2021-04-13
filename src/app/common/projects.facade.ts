import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/reducers";
import { projectModel } from 'src/app/common/models/project.model';
import * as actions from "../store/projects/projects.actions";
import { ProjectsQuery } from '../store/projects/projects.selectors';

@Injectable()
export class ProjectsFacade {

  projects$ = this.store.select(ProjectsQuery.projects);
  projectsSelected$ = this.store.select(ProjectsQuery.projectSelected);
  error$ = this.store.select(ProjectsQuery.error);

  constructor(
    private store: Store<AppState>
  ) { }

  loadProjects(): void {
    this.store.dispatch(actions.loadProjects());
  }

  selectProject(data: projectModel) {
    this.store.dispatch(actions.selectProject({ data }));
  }


}
