import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {

  projectId: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getParameterId();
  }

  getParameterId(): void {
    this.activatedRouter.params.subscribe(params => {
      this.projectId = params.id;
      this.returnToProjectsIfNotProjectId();
    })
  }

  returnToProjectsIfNotProjectId(): void {
    if (!this.projectId) {
      this.router.navigate(['/projects']);
    }
  }
}
