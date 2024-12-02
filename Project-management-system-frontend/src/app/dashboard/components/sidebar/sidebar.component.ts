import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { StorageService } from '../../../auth/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private service:AuthService,private Storage:StorageService,private router:Router){}
  user ={
    id : '',
    firstname : '',
    lastname : '',
    email : '',
    phone : '',
    password : '',
    image : ''
  } 

  ngOnInit(): void{
    this.user = this.Storage.getUser();
  }

}
