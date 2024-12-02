import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  if (
    (storageService.getToken()!=null &&
    storageService.getUser() !== null &&
    storageService.getUserRole() == 'SUPER_ADMIN') || 
    (storageService.getToken()!=null &&
    storageService.getUser() !== null &&
    storageService.getUserRole() == 'ADMIN') ||
    (storageService.getToken()!=null &&
    storageService.getUser() !== null &&
    storageService.getUserRole() == 'EMPLOYEE')
  ) {
    
    
    return true;
  }
  // toastrService.warning("Session Expired!", "Please login again!")
  router.navigate(['/']);
  console.log(storageService.getToken());
  console.log(storageService.getUser());
  console.log(storageService.getUserRole());
  return false;
};
