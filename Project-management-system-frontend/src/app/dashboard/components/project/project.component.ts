import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../services/categories.service';
interface Project {
  id: number;
    projectId: number;
    projectName: string;
    
    category: string;
    duration:number;
    projectManager:string;
    status:string;
    date: string;
    description:string;
    teamMembers:string
    
  }
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  selectedProject: any = {};
  editForm: FormGroup; 
  project: Project[] = [];
  categor: any[] = [];
  constructor(private service:ProjectService,private fb: FormBuilder, private toast: ToastrService,private category:CategoriesService){
    this.editForm = this.fb.group({
      
      projectName: ['', Validators.required],
      category: ['', Validators.required],
      // duration: ['', Validators.required],
      description: ['', Validators.required],
      // teamMembers: ['', Validators.required],
      projectManager: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      
    });

  }
  // project=[
  //   {
  //     projectName:"",
  //     category:"",
  //     duration:"",
  //     projectManager:"",
  //     status:"",
  //     date:""

  //   }
  // ]
  ngOnInit(): void {
    this.service.getAllProjects().subscribe(res=>{
      this.project = res;
      console.log(res)
    })
    this.getCategories();

  }

  // Function to fetch categories from backend
  getCategories() {
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categor = res;  // Assign response to the categor array
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  openEditModal(project: Project): void {
    this.selectedProject = { ...project };
    this.editForm.patchValue(this.selectedProject);

    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  deleteProject(categoryId: string): void {
    this.toast.error("Cannot delete the Category")
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedProject = { ...this.selectedProject, ...this.editForm.value };

      // Send only team member IDs to the backend
      updatedProject.teamMembers = this.editForm.value.teamMembers;

      this.service.updateProject(updatedProject).subscribe(
        (response) => {
          const index = this.project.findIndex(
            (p) => p.id === updatedProject.id
          );
          if (index !== -1) {
            this.project[index] = updatedProject;
          }

          this.toast.success('Project Updated Successfully');
          console.log('Project updated:', response);
        },
        (error) => {
          console.error('Error updating project:', error);
        }
      );
    } else {
      alert('Invalid form');
    }
  }


  
  deleteCategory(categoryId: string): void {
    this.toast.error("Cannot delete the Projects")
  }

}
