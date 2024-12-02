import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { StorageService } from '../../../../auth/storage/storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createnew',
  templateUrl: './createnew.component.html',
  styleUrl: './createnew.component.css'
})
export class CreatenewComponent implements OnInit {
  selectedFile: File | null = null;
  constructor(private service:AdminService,private storage:StorageService,router:Router,private toast:ToastrService,private route:Router){}

  group = [
    {
      id : "",
      group_name : "",
      Created_date : "",
      description : "",
    }
  ]

  ngOnInit(): void {
    this.service.getAllGroups().subscribe(res=>{
      if(res!==null){
        this.group = res;
      }
    }, err=>{
      console.log(err);
      
    })
  }


     
  form: FormGroup =new FormGroup({
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    contact:new FormControl(''),
    address:new FormControl(''),
    image:new FormControl(''),
    groupId:new FormControl('')
  })

  // user = {
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  //   address: "",
  //   image: "",
  //   adminGroups : {
  //     id : ""
  //   }
  // }

  FormSubmit() {
    const formData = new FormData();
    
    formData.append('firstName', this.form.get("firstName")?.value);
    formData.append('lastName', this.form.get("lastName")?.value);
    formData.append('email', this.form.get("email")?.value);
    formData.append('password', this.form.get("password")?.value);
    formData.append('contact', this.form.get("contact")?.value);
    formData.append('address', this.form.get("address")?.value);
    formData.append('image', this.selectedFile  ? this.selectedFile : '');
    formData.append('groupId', this.form.get("groupId")?.value);
    
    this.service.adduser(formData).subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.toast.success("Admin Created Successfully");
        this.route.navigate(['/admins'])
      }
    }, err => {
      console.log(err);
      this.toast.error("Error creating Admin");
    });
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
    }
  }

  }


