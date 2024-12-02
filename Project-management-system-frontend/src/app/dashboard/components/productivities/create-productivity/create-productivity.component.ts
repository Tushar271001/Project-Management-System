import { Component, OnInit } from '@angular/core';
import { ProductivitiesService } from '../../../services/productivities.service';
import { StorageService } from '../../../../auth/storage/storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-productivity',
  templateUrl: './create-productivity.component.html',
  styleUrl: './create-productivity.component.css'
})
export class CreateProductivityComponent implements OnInit {
  projects: any[] = []; // Array to hold the projects

  constructor(
    private service: ProductivitiesService,
    private storage: StorageService,
    private router: Router,
    private toast: ToastrService
  ) {}

  form: FormGroup = new FormGroup({
    productivityName: new FormControl(''),
    project: new FormControl(''), // This will hold the project ID
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    status: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit(): void {
    this.fetchProjects(); // Fetch projects when the component initializes
  }

  fetchProjects() {
    this.service.getProjects().subscribe((res) => {
      this.projects = res; // Assuming the response is an array of projects
    });
  }

  formSubmit() {
    console.log(this.form.value);

    this.service.addProductivities(this.form.value).subscribe(() => {
      this.toast.success("Productivity Created Successfully");
      this.router.navigate(['/productivities']);
    });
  }
}
