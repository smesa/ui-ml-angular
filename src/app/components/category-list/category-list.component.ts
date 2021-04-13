import { Component, Input, OnInit } from '@angular/core';
import { visionCategoryModel } from 'src/app/common/models/category.model';
import { ProjectsFacade } from 'src/app/common/projects.facade';
import { FirestoreOperationsService } from 'src/app/services/firestore-operations.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  projectSelected$ = this.projectsFacade.projectsSelected$;
  categoriesList: any[];

  constructor(
    private fo: FirestoreOperationsService,
    private projectsFacade: ProjectsFacade
  ) { }

  @Input() projectId: string;

  ngOnInit(): void {
    this.getProjectCategories();
  }

  getProjectCategories() {
    this.fo.colWithIds$(`projects/${this.projectId}/categories`).subscribe((categories) => {
      this.categoriesList = categories;
    })
  }

  addVisionCategory() {

    console.log(this.projectId);
    const newCategory: visionCategoryModel = {
        name: 'Categoria',
        pics: []
    };

    this.fo.add(`projects/${this.projectId}/categories`, newCategory);

  }
}
