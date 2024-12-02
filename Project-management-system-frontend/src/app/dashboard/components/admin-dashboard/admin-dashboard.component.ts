import { Component } from '@angular/core';
import { StorageService } from '../../../auth/storage/storage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private storag:StorageService){}

  logout(){
    this.storag.logout();
  }

}
