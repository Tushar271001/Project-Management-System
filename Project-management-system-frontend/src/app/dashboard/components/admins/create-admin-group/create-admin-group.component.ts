import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin-group',
  templateUrl: './create-admin-group.component.html',
  styleUrl: './create-admin-group.component.css'
})
export class CreateAdminGroupComponent {

  constructor(private admiNService:AdminService,private toast:ToastrService,private route:Router){}

  form: FormGroup = new FormGroup({
    group_name : new FormControl(''),
    Created_date : new FormControl(''),
    description : new FormControl(''),
  })

  formSubmit(){
    this.admiNService.add_adminGroup(this.form.value).subscribe(res=>{
      if(res!==null){
        console.log(res);
        this.toast.success("Admin Group Created Succesfully")
        this.route.navigate(['/creategroup'])
      }
    }, err=>{
      console.log(err);
      this.toast.error("Failed to create admin group")
    })
  }

}
