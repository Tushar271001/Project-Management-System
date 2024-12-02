import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private service: TaskService) {}

  completedTasks = [
    {
      id: "",
      projectName: "",
      taskName: "",
      duration: "",
      status: "",
      date: "",
      teamMembers:""
    }
  ];

  ngOnInit(): void {
    this.service.getCompletedTasks().subscribe(res => {
      this.completedTasks = res;
      console.log(res);
    });
  }
}
