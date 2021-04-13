import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreOperationsService } from 'src/app/services/firestore-operations.service';
import { projectModel } from '../../common/models/project.model';
declare var UIkit: any;

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  createProjectForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  })

  constructor(
    private fb: FormBuilder,
    private fo: FirestoreOperationsService
  ) { }

  ngOnInit(): void {
  }

  openModalCreateProject(): void {
    UIkit.modal('#modal-select-type').show();
  }

  selectType(type): void {
    this.createProjectForm.controls.type.setValue(type);
  }

  async createProject() {
    const { name, description, type } = this.createProjectForm.value;
    const projectInfo: projectModel = {
      name, description, type
    }

    try {
      await this.fo.add('projects', projectInfo);
      this.closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  closeModal():void {
    UIkit.modal('#modal-select-type').hide();
  }


}
