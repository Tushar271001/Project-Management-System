import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ProjectService } from '../../../services/project.service';
import { TeammemberService } from '../../../services/teammember.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css'],
})
export class CreateNewTaskComponent implements OnInit {
  projects: any[] = []; // Store the list of projects
  teamMembers: any[] = []; // Store the list of team members
  selectedTeamMembers: number[] = []; // Store selected team member IDs
  dropdownOpen: boolean = false; // Dropdown state
  selectedMembersDisplay: string = 'Select Team Members'; // Display string

  // Define the form
  form: FormGroup = new FormGroup({
    taskName: new FormControl(''),
    project: new FormControl(''), // This will store the selected project ID
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    status: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private teamService: TeammemberService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    // Fetch the list of projects
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        this.toast.error('Failed to fetch projects');
      }
    );

    // Fetch the list of team members
    this.teamService.getAllTeamMember().subscribe(
      (data) => {
        this.teamMembers = data;
      },
      (error) => {
        this.toast.error('Failed to fetch team members');
      }
    );
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onTeamMembersChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const memberId = Number(checkbox.value);

    if (checkbox.checked) {
      this.selectedTeamMembers.push(memberId);
    } else {
      this.selectedTeamMembers = this.selectedTeamMembers.filter((id) => id !== memberId);
    }

    this.updateSelectedMembersDisplay();
  }

  updateSelectedMembersDisplay() {
    this.selectedMembersDisplay = this.selectedTeamMembers
      .map((id) => this.teamMembers.find((member) => member.id === id)?.name)
      .filter(Boolean)
      .join(', ') || 'Select Team Members';
  }

  formSubmit() {
    const taskData = {
      ...this.form.value,
      teamMembers: this.selectedTeamMembers.map((id) => ({ id })), // Map to {id: memberId}
    };

    this.taskService.addTask(taskData).subscribe(
      () => {
        this.toast.success('Task Created Successfully');
        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.toast.error('Failed to create task');
      }
    );
  }
}
