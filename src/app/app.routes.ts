import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/tasks-list/tasks-list.component').then(m => m.TasksListComponent)
    },
    {
        path: 'add-task',
        loadComponent: () => import('./components/tasks-form/tasks-form.component').then(m => m.TasksFormComponent)
    },
    {
        path: 'add-task/:id',
        loadComponent: () => import('./components/tasks-form/tasks-form.component').then(m => m.TasksFormComponent)
    },
];
