import { Component, OnInit } from '@angular/core';
import { TeammemberService } from '../../../services/teammember.service';
import { StorageService } from '../../../../auth/storage/storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-create-new-teammember',
  templateUrl: './create-new-teammember.component.html',
  styleUrl: './create-new-teammember.component.css'
})
export class CreateNewTeammemberComponent implements OnInit {
  constructor(private service:TeammemberService,private storage:StorageService,private router:Router,private toast:ToastrService){}
  selectedFile: File | null = null;
  designation =[
    {
      id : "",
      name :"",
      category :"",
      description :""
    }
  ]
  // admins =[
  //   {
  //     id : "",
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     contact:""
      
  //   }
  // ]

  ngOnInit(): void {
    this.service.getAllDesignations().subscribe(res=>{
      if(res!==null){
        this.designation = res;
      
      }
    }, err=>{
      console.log(err);
      
    })
    // this.services.getAllUser().subscribe(res=>{
    //   if(res!==null){
    //     this.admins = res;
    //     }
    //     }, err=>{
    //       console.log(err);
    //       })
  }

  form:FormGroup=new FormGroup({
    // categories:new FormControl(''),
    designation:new FormControl(''),
    name:new FormControl(''),
    email:new FormControl(''),
    contact:new FormControl(''),
    address:new FormControl(''),
    image:new FormControl('')
  })

  // team = {
  //   designation: {
  //     id:""
  //   },
  //   name: "",
  //   email: "",
  //   phoneno: "",
  //   address: "",
  //   image: "",
  //   status: "",
  //   date :"",
  //   categories :""
     
  //   }

    formSubmit() {
      console.log(this.form.value);
  
      const formData = new FormData();
      formData.append('designation', this.form.get("designation")?.value);
      formData.append('name', this.form.get("name")?.value);
      formData.append('email', this.form.get("email")?.value);
      formData.append('contact', this.form.get("contact")?.value);
      formData.append('address', this.form.get("address")?.value);
      
      // Append image file if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
  
      // Send data to backend
      this.service.addTeamMember(formData).subscribe(res => {
        if (res !== null) {
          console.log(res);
          this.toast.success("Team Member added successfully");
          
          // Optionally navigate back after success
          this.router.navigate(['/teammembers']);
        }
      }, err => {
        console.log(err);
        this.toast.error("Error adding Team Member");
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
