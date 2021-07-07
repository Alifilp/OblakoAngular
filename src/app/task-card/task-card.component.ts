import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {Project} from '../todos';

@Component({
  selector: 'app-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit{
  @Input() project!: Project; //! сообщает компилятору что переменная не может быть null
  @Output('onTodoUpdate') onTodoUpdate = new EventEmitter();
  constructor() {
  }
  onCheckBoxUpdate (todo_id: number) {
    this.onTodoUpdate.emit(todo_id)
  }
  ngOnInit(){
  }
}
