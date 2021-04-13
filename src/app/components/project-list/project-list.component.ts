import { Component, OnInit } from '@angular/core';
import { FirestoreOperationsService } from '../../services/firestore-operations.service';
import { Observable } from 'rxjs';
import { projectModel } from 'src/app/common/models/project.model';
import { Router } from '@angular/router';
import { ProjectsFacade } from '../../common/projects.facade';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList$ = this.projectsFacade.projects$;


  constructor(
    private fo: FirestoreOperationsService,
    private router: Router,
    private projectsFacade: ProjectsFacade
  ) { }

  ngOnInit(): void {
    this.projectsFacade.loadProjects();
  }

  deleteProject(item): void {
    this.fo.delete(`projects/${item.id}`);
  }

  selectProjectToTrain(project: projectModel): void {
    this.projectsFacade.selectProject(project);
    this.router.navigate(['/train', project.id]);
  }
}
