import { Component, OnInit } from '@angular/core';
import { DesignationsService } from '../../../services/designations.service';
import { StorageService } from '../../../../auth/storage/storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-designation',
  templateUrl: './create-designation.component.html',
  styleUrl: './create-designation.component.css'
})
export class CreateDesignationComponent implements OnInit {

  constructor(private service:DesignationsService,private storage:StorageService,private router:Router,private toast:ToastrService){}

  categor = [
    {  
      id : "",
      name : "",
      notes : "",
      status : "",
      date : ""
    }
  ]

 

  ngOnInit(): void {
    this.service.getAllCategories().subscribe(res=>{
      if(res!==null){
        this.categor = res;
      }
    }, err=>{
      console.log(err);
      
    })
  }

  form:FormGroup=new FormGroup({
    name:new FormControl(''),
    category:new FormControl(''),
    description:new FormControl(''),
    

  })
  
  designations = {
    name:"",
    category:"",
   
    description:""
  }
  

  formSubmit(){
    // console.log(this.form.value);
    this.designations.name=this.form.get("name")?.value,
    this.designations.category=this.form.get("category")?.value,
    this.designations.description=this.form.get("description")?.value,

    this.service.adddesignations(this.designations).subscribe(res=>{
      if(res!==null){
        console.log(res);
        this.toast.success("designation Created Succesfully")
        
      this.router.navigate(['/designations']);
      }
  
    },err=>{
      console.log(err);
      this.toast.error("Error adding designation")
      
    })
   }

}
