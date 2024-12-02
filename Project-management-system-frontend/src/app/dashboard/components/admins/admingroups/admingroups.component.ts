import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export interface Permissions {
  id: number; 
  showPermission: boolean;
  createPermission: boolean;
  editPermission: boolean;
  deletePermission: boolean;
  modules: string; 
}

@Component({
  selector: 'app-admingroups',
  templateUrl: './admingroups.component.html',
  styleUrls: ['./admingroups.component.css']
})
export class AdmingroupsComponent implements OnInit {
formSubmit() {
  console.log(this.form.value);
}

  permissions: Permissions[] = []; 
  adminGroup = {
    id: '',
    group_name: '',
    Created_date: '',
    description: ''
  };

  form: FormGroup = new FormGroup({});
  adminGroup_id: any;

  constructor(private service: AdminService, private para: ActivatedRoute, private toast: ToastrService) {}

  ngOnInit(): void {
    this.para.paramMap.subscribe(res => {
      this.adminGroup_id = res.get("id");
      this.loadGroupData(this.adminGroup_id);
      this.loadPermissions(this.adminGroup_id);
    });
  }

  private loadGroupData(groupId: string) {
    this.service.getGroupById(groupId).subscribe(res => {
      if (res !== null) {
        this.adminGroup = res;
      }
    });
  }

  private loadPermissions(groupId: string) {
    this.service.getAllPermissionsById(groupId).subscribe(res => {
      if (res !== null) {
        this.permissions = res;
        console.log(res);
        

        // Create form controls for each permission
        this.permissions.forEach(permission => {
          this.form.addControl(`showPermission_${permission.id}`, new FormControl(permission.showPermission));
          this.form.addControl(`createPermission_${permission.id}`, new FormControl(permission.createPermission));
          this.form.addControl(`editPermission_${permission.id}`, new FormControl(permission.editPermission));
          this.form.addControl(`deletePermission_${permission.id}`, new FormControl(permission.deletePermission));
        });
      }
    }, err => {
      console.log(err);
    });
  }

  onupdate() {
    const updatedPermissions = this.permissions
      .map(permission => ({
        id: permission.id,
        showPermission: this.form.get(`showPermission_${permission.id}`)?.value,
        createPermission: this.form.get(`createPermission_${permission.id}`)?.value,
        editPermission: this.form.get(`editPermission_${permission.id}`)?.value,
        deletePermission: this.form.get(`deletePermission_${permission.id}`)?.value,
      }))
      .filter((updatedPermission, index) => {
        const originalPermission = this.permissions[index];
        return (
          updatedPermission.showPermission !== originalPermission.showPermission ||
          updatedPermission.createPermission !== originalPermission.createPermission ||
          updatedPermission.editPermission !== originalPermission.editPermission ||
          updatedPermission.deletePermission !== originalPermission.deletePermission
        );
      });
  
    if (updatedPermissions.length > 0) {
      console.log('Payload to be sent:', updatedPermissions);
  
      updatedPermissions.forEach(permissionDto => {
        this.service.updatePermissions(permissionDto).subscribe(
          () => {
            this.toast.success("Permission updated successfully", '', {
              positionClass: 'toast-bottom-right'
            });
          },
          err => {
            console.error(err);
            this.toast.error("Failed to update permission", '', {
              positionClass: 'toast-bottom-right'
            });
          }
        );
      });
    } else {
      console.log("No changes detected. Update not required.");
    }
  }
  
  
  
  
}
