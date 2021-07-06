import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Project} from "../todos";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  // @ts-ignore
  taskForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private formBuilder: FormBuilder) {

  }

   prjs: Project []=[];
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(){
    this.taskForm = this.formBuilder.group({
      title: new FormControl(['']),
      project_title: new FormControl(['']),
      project_id: new FormControl([])
    });
    }
  ngOnInit() {
    this.buildForm();
  }

}
