import { Component, OnInit } from '@angular/core';
import { ProductivitiesService } from '../../../services/productivities.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface Productivities {
  id: string;
  productivityId: number;
  projectName: string;
  duration: number;
  productivityName: string;
  project: string;
  startDate: string;
  endDate: string;
  status: string;
}

@Component({
  selector: 'app-productivities',
  templateUrl: './productivities.component.html',
  styleUrls: ['./productivities.component.css']
})
export class ProductivitiesComponent implements OnInit {
  selectedProductivity: Productivities = {} as Productivities;
  productivities: Productivities[] = [];
  projects: any[] = [];
  editForm: FormGroup; 

  constructor(
    private service: ProductivitiesService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    this.editForm = this.fb.group({
      productivityName: ['', Validators.required],
      project: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProductivities();
    this.fetchProjects();
  }

  fetchProductivities() {
    this.service.getAllProductivities().subscribe(res => {
      this.productivities = res;
      console.log(res);
    });
  }

  fetchProjects() {
    this.service.getProjects().subscribe(res => {
      this.projects = res; // Assuming the response is an array of projects
    });
  }

  openEditModal(productivity: Productivities): void {
    this.selectedProductivity = { ...productivity };
    this.editForm.patchValue(this.selectedProductivity);

    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedProductivity = { ...this.selectedProductivity, ...this.editForm.value };
      this.service.updateProductivity(updatedProductivity).subscribe(response => {
        const index = this.productivities.findIndex(p => p.productivityId === updatedProductivity.productivityId);
        if (index !== -1) {
          this.productivities[index] = updatedProductivity; // Update the productivity in the array
        }

        this.toast.success("Productivity Updated Successfully");
        console.log('Productivity updated:', response);
      }, error => {
        console.error('Error updating productivity:', error);
      });
    }
  }

  deleteCategory(productivityId: string): void {
    this.toast.error("Cannot delete the Productivity");
  }
}
