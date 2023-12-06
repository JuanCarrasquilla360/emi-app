import { CommonModule } from '@angular/common';
import { TaskServiceService } from './../../services/task-service.service';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../Models/TasksModel';
import { formatTasks } from '../../constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {
  tasks: Array<any> = []
  currentPage = 1
  itemPerPage = 5
  get pages(): number[] {
    const pages = Math.ceil(this.tasks.length / this.itemPerPage)
    return Array(pages).fill(0).map((x, i) => i)
  }
  get pageTasks() {
    const start = (this.currentPage - 1) * this.itemPerPage
    const end = this.currentPage * this.itemPerPage
    return this.tasks.slice(start, end)
  }
  constructor(private taskService: TaskServiceService, private router: Router) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = formatTasks(res.tasks)
    })
  }
  prevPage() {
    this.currentPage--;
  }
  nextPage() {
    this.currentPage++;
  }
  changePage(i: number) {
    if (i > 0 && i <= this.pages.length) {
      this.currentPage = i
    }
  }
  navToAddTasks(id = "") {
    this.router.navigate([`/add-task/${id}`])
  }
}
