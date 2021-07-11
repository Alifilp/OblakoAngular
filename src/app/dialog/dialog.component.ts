import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ITodoDtm, Project} from "../todos";

interface DialogData {
  projects: Project[]
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  taskForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  buildForm() {
    this.taskForm = this.formBuilder.group({ // Объект того же типа, что и ITodoDtm
      title: ['', Validators.required],
      project_id: ['', Validators.minLength(1)],
      project: this.formBuilder.group({
        title: null
      })
    });
  }
  listTrack (index: number) {
    return index;
  }
  ngOnInit() {
    this.buildForm();
  }

  onApplyClick() {
    const data: ITodoDtm = this.taskForm.value;
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
      }

}

