import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { StorageService } from '../../../../auth/storage/storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { TeammemberService } from '../../../services/teammember.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  categor: any[] = [];
  teamMembers: any[] = [];
  selectedTeamMembers: number[] = [];
  dropdownOpen: boolean = false;
  selectedMembersDisplay: string = 'Select Team Members';

  form: FormGroup = new FormGroup({
    projectName: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    projectManager: new FormControl(''),
    category: new FormControl(''),
    status: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private service: ProjectService,
    private storage: StorageService,
    private router: Router,
    private adminService: AdminService,
    private toast: ToastrService,
    private teamService: TeammemberService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.fetchTeamMember();
  }

  getCategories() {
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categor = res;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchTeamMember() {
    this.teamService.getAllTeamMember().subscribe((res) => {
      this.teamMembers = res;
      console.log('Team Members:', this.teamMembers); // Debugging: Check the IDs here
    });
  }
  

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // onTeamMembersChange(event: Event) {
  //   const checkbox = event.target as HTMLInputElement;
  //   const memberId = Number(checkbox.value);

  //   if (checkbox.checked) {
  //     this.selectedTeamMembers.push(memberId);
  //   } else {
  //     this.selectedTeamMembers = this.selectedTeamMembers.filter(id => id !== memberId);
  //   }

  //   this.updateSelectedMembersDisplay();
  // }

  // updateSelectedMembersDisplay() {
  //   this.selectedMembersDisplay = this.getSelectedMembers();
  // }

  // getSelectedMembers(): string {
  //   return this.selectedTeamMembers
  //     .map(id => this.teamMembers.find(member => member.id === id)?.name)
  //     .filter(Boolean)
  //     .join(', ') || 'Select Team Members';
  // }




  onTeamMembersChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const memberId = Number(checkbox.value); // Extract the ID from the checkbox
  
    console.log('Checkbox value:', checkbox.value);  // Debugging: Check if the value is correct
    console.log('Member ID:', memberId);  // Debugging: Ensure this is not 0
  
    if (!isNaN(memberId) && memberId > 0) {  // Ensure the ID is valid and non-zero
      // Update selected team members
      if (checkbox.checked) {
        this.selectedTeamMembers.push(memberId);
      } else {
        this.selectedTeamMembers = this.selectedTeamMembers.filter(id => id !== memberId);
      }
  
      // Update the input display with selected members
      this.updateSelectedMembersDisplay();
    } else {
      console.error('Invalid memberId:', memberId); // Error handling for invalid IDs
    }
  }

  updateSelectedMembersDisplay() {
    // Update the displayed string with the names of selected members
    this.selectedMembersDisplay = this.selectedTeamMembers
      .map(id => this.teamMembers.find(member => member.id === id)?.name)
      .filter(Boolean)
      .join(', ') || 'Select Team Members';
  }
  
  
  

  

  formSubmit() {
    const projectData = {
      projectName: this.form.value.projectName,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      projectManager: this.form.value.projectManager,
      category: Number(this.form.value.category), // Ensure it's a number
      status: this.form.value.status,
      description: this.form.value.description,
      date: new Date().toISOString().split('T')[0],
      teamMembers: this.selectedTeamMembers.map(id => ({ id }))  // Map to {id: memberId}
    };
  
    console.log('Project data being sent:', projectData);  // Check data before sending
  
    this.service.addProject(projectData).subscribe(() => {
      this.toast.success("Project Created Successfully");
      this.router.navigate(['/project']);
    }, error => {
      console.error('Error creating project:', error);
      this.toast.error("Failed to create project");
    });
  }
  
  
  
}
