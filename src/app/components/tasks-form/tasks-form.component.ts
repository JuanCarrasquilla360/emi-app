import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../../services/task-service.service';
import { formatTasks, getNearstateHistory } from '../../constants/constants';
import { TaskModel, Tasks } from '../../Models/TasksModel';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.css'
})
export class TasksFormComponent implements OnInit {
  tasks: Array<any> = []
  title = "Add"
  states: TaskModel["states"] = []
  id!: string
  constructor(private taskService: TaskServiceService, private route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get("id")?.toString() || ""
  }

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    completed: new FormControl(false, Validators.required),
    stateHistory: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = formatTasks(res.tasks)
      this.states = res.states
      if (!this.id) return
      this.title="Edit"
      const taskById = res.tasks.find(t => t.id === this.id)
      const setValues = {
        title: taskById?.title || "",
        description: taskById?.description || "",
        dueDate: taskById?.dueDate || "",
        completed: taskById?.completed || true,
        stateHistory: getNearstateHistory(taskById?.stateHistory || []).state || "",
        notes: taskById?.notes.toString() || "",
      }
      this.taskForm.setValue(setValues)

    })
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault()
    const body = new Tasks(this.taskForm.value)
    this.taskService.addTask(body).subscribe(res => console.log(res))
  }
}
