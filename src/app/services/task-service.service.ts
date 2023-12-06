import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs'
import { TaskModel, TaskProps } from '../Models/TasksModel';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private dbUrl = '/assets/db.json'
  constructor(private http: HttpClient) { }
  getTasks(): Observable<TaskModel> {
    return this.http.get<TaskModel>(this.dbUrl)
  }

  addTask(task: TaskProps) {
    return this.getTasks()
      .pipe(
        map(tasks => {
          let newTasks: TaskProps[] = []
          task.id = moment().toString()
          newTasks = [...tasks.tasks, task]
          return {task, newTasks}
        }),
        switchMap(updatedTasks => {
          return this.http.post(this.dbUrl, updatedTasks.task).pipe(map(() => updatedTasks));
        })
      )
  }
}
