import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-pending-task',
  templateUrl: './pending-task.component.html',
  styleUrls: ['./pending-task.component.css']
})
export class PendingTaskComponent implements OnInit {
onSearch(arg0: any) {
throw new Error('Method not implemented.');
}
  pendingTasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadPendingTasks();
  }

  loadPendingTasks(): void {
    this.taskService.getPendingTasks().subscribe(
      (data) => {
        this.pendingTasks = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching pending tasks', error);
      }
    );
  }
}
